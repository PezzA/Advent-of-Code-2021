import {Puzzle, PuzzleReturn} from "./common";

export type NumberType = number | [left: NumberType, right: NumberType]

const t: NumberType = [[[[1, 2], [3, 4]], [[5, 6], [7, 8]]], 9]

const bigNumber = /(\d{2})/
const firstPair = /(?<pair>\[(?<left>\d+),(?<right>\d+)\]).*/

function partOne(input: string[]): PuzzleReturn {
    const result = addList(input)
    return getMagnitude(result)
}

function partTwo(input: string[]): PuzzleReturn {
    let mag = 0;
    for (let i=0; i<input.length; i++){
        for (let j=0; j<input.length; j++) {
            if(i===j){
                continue
            }

            const res = add(input[i], input[j])

            const tmag = getMagnitude(res)

            if (tmag> mag){
                mag = tmag
            }
        }
    }
    return mag
}

export function findExplode(input: string, targetDepth: number = 5): number {
    let depth = 0;

    for (let pos = 0; pos < input.length; pos++) {
        if (input[pos] === "[") {
            depth++
        }

        if (input[pos] === "]") {
            depth--
        }

        if (depth === targetDepth) {
            return pos
        }
    }
    return -1
}

export function split(input: string): [boolean, string] {
    const bigDigit = bigNumber.exec(input)

    if (!bigDigit) {
        return [false, input]
    }

    const val = parseInt(bigDigit[0])

    const newLeft = Math.floor(val / 2)
    const newright = Math.ceil(val / 2)

    const index = bigDigit.index

    return [true, `${input.substring(0, bigDigit.index)}[${newLeft},${newright}]${input.substring(bigDigit.index + 2)}`]

}

function addToLastNumber(toAdd: number, fragment: string): string {
    const numberRegex = /(\d+)/g
    let lastIndex = 0;
    let lastValue = "";

    for (let m = numberRegex.exec(fragment); m !== null; m = numberRegex.exec(fragment)) {
        lastValue = m[0]
        lastIndex = m.index
    }

    const prefix = fragment.substring(0,lastIndex)
    const postfix = fragment.substring(lastIndex+ lastValue.length)

    const newValue = parseInt(lastValue)+ toAdd
    return `${prefix}${newValue}${postfix}`
}

function addToFirstNumber(toAdd: number, fragment: string): string {
    const numberRegex = /(\d+)/g
    let m = numberRegex.exec(fragment)

    if(m===null){
        throw new Error("shouldent happen")
    }

    const prefix = fragment.substring(0,m.index)
    const postfix = fragment.substring(m.index+ m[0].length)

    const newValue = parseInt(m[0])+ toAdd
    return `${prefix}${newValue}${postfix}`
}

export function replaceWithMagnitude(input:string): [boolean,string]{
    const match = firstPair.exec(input)

    if(match===null){
        return [false, input]
    }

    const prefix= input.substring(0,match.index)
    const postFix= input.substring(match.index +match[1].length)

    const newVal = (parseInt(match[2])*3) + (parseInt(match[3])*2)

    return [true, `${prefix}${newVal}${postFix}`]
}

export function getMagnitude(input:string): number{
    let found = true

    while(found){
        [found, input] = replaceWithMagnitude(input)
    }

    return parseInt(input)
}

export function explode(input: string): [boolean, string] {
    const preRegex = /(\d+)/g
    const postRegex = /(\d+)/g
    const index = findExplode(input)
    if (index === -1) {
        return [false, input]
    }

    let prefix = input.substring(0, index)

    const pairMatch = firstPair.exec(input.substring(index))
    const match = pairMatch?.groups?.pair ?? "";

    let  postfix = input.substring(index + match.length)

    const [left, right] = [parseInt(pairMatch?.groups?.left ?? "0"), parseInt(pairMatch?.groups?.right ?? "0")]

    const preMatch = preRegex.exec(prefix)
    const postMatch = postRegex.exec(postfix)

    if (preMatch !== null) {
        prefix = addToLastNumber(left,prefix)
    }

    if (postMatch !== null) {
        postfix = addToFirstNumber(right, postfix)
    }

    return [true, `${prefix}0${postfix}`]
}

export function explodeNumber(n: NumberType, depth: number): [boolean, NumberType, number, number] {
    if (typeof n === "object") {
        let [left, right] = n
        if (typeof left !== "number") {
            const [sl, sr] = left
            if (typeof sl === "number" && typeof sr === "number" && depth >= 3) {
                if (typeof right === "number") {
                    n = [0, right + sr]
                }
                return [true, n, sl, 0]
            } else {
                let [updated, n, lc, rc] = explodeNumber(left, depth + 1)
                if (typeof right === "number" && rc != 0) {
                    right += rc
                    rc = 0
                }
                if (updated) {
                    return [true, [n, right], lc, rc]
                }
            }
        }

        if (typeof right !== "number") {
            const [sl, sr] = right
            if (typeof sl === "number" && typeof sr === "number" && depth >= 3) {
                if (typeof left === "number") {
                    n = [left + sl, 0]
                }
                return [true, n, 0, sr]
            } else {
                let [updated, n, lc, rc] = explodeNumber(right, depth + 1)
                if (typeof left === "number" && lc != 0) {
                    left += lc
                    lc = 0
                }
                if (updated) {
                    return [true, [left, n], lc, rc]
                }
            }
        }
    }

    return [false, n, 0, 0]
}

export function reduce(input: string): string {
    let processed = true;

    while (processed) {
        [processed, input] = explode(input)

        if (processed) {
            continue
        }

        [processed, input] = split(input)

        if (processed) {
        }
    }

    return input
}

export function add(a: string, b: string): string {
    const newString = `[${a},${b}]`
    return reduce(newString)
}

export function addList(numbers: string[]): string {
    let total = add(numbers[0], numbers[1])
    for (let i = 2; i < numbers.length; i++) {
        total = add(total, numbers[i])
    }

    return total
}

export default {
    title: "Snailfish",
    year: 2021,
    day: 18,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle