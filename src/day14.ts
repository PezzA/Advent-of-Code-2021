import {Puzzle, PuzzleReturn} from "./common";

export type InsertionMap = Map<string, string>

export function parseData(input: string[]): [string, InsertionMap] {
    let elements = "";
    let rules: InsertionMap = new Map<string, string>();

    let onRules = false

    for (const line of input) {
        if (line === "") {
            onRules = true
            continue
        }

        if (onRules) {
            const bits = line.split(' -> ');

            rules.set(bits[0], bits[1])
        } else {
            elements = line
        }
    }

    return [elements, rules]
}

export function runStep(element: string, rules: InsertionMap): string {
    let newElement = "";

    for (let i = 1; i < element.length; i++) {
        const pair = element[i - 1] + element[i]

        const rule = rules.get(pair)

        if (rule === undefined) {
            continue
        }

        newElement += element[i - 1] + rule
    }

    newElement += element[element.length - 1]

    return newElement
}

function cloneMap<T, V>(input: Map<T, V>): Map<T, V> {
    const map = new Map<T, V>();

    for (const [k, v] of input) {
        map.set(k, v)
    }
    return map
}


export function runStep2(pairMap: Map<string, number>, repMap: Map<string, string[]>): Map<string, number> {
    const clonedMap = cloneMap(pairMap)

    // for all current pairs
    for (const [k, v] of clonedMap) {

        if (v === 0) {
            continue
        }
        //get the replacements for the pairs
        const spawnedPairs = repMap.get(k)

        if (spawnedPairs === undefined) {
            continue
        }

        const replacement1 = spawnedPairs[0]
        const replacement2 = spawnedPairs[1]

        let firstPairCount = pairMap.get(replacement1) ?? 0
        let secondPairCount = pairMap.get(replacement2) ?? 0

        // in the pair map, will lose the original pairs
        const currentVal = pairMap.get(k) ?? 0

        pairMap.set(k, currentVal - v)


        if (k !== replacement1) {
            pairMap.set(replacement1, firstPairCount + v)
        } else {
            pairMap.set(k, currentVal)
        }

        if (k !== replacement2) {
            pairMap.set(replacement2, secondPairCount + v)
        } else {
            pairMap.set(k, currentVal)
        }
    }
    return pairMap
}

export function getElementCounts(input: string): Map<string, number> {
    const counts = new Map<string, number>();

    for (const char of input) {
        const val = counts.get(char)

        if (val === undefined) {
            counts.set(char, 1)
        } else {
            counts.set(char, val + 1)
        }
    }
    return counts
}

export function getAnswer(counts: Map<string, number>): number {

    let [min, max] = [0,0]
    let firstval = true

    for (const [k, v] of counts) {
        if(firstval === true) {
            min = v
            max = v
            firstval = false
        }

        if (v > max) {
            max = v
        }

        if (v < min) {
            min = v
        }
    }

    return max - min
}

export function partOne(rawData: string[]): PuzzleReturn {
    const [elements, rules] = parseData(rawData)

    let elementTemp = elements
    for (let i =0; i<10; i++){
        elementTemp = runStep(elementTemp, rules)
    }

    const counts = getElementCounts(elementTemp)

    return getAnswer(counts)
}

function getCreates(rules: InsertionMap): Map<string, string[]> {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const replacements = new Map<string, string[]>();

    for (const i of alpha) {
        for (const j of alpha) {
            const test = rules.get(i + j)

            if (test === undefined) {
                continue
            }

            replacements.set(i + j, [i + test, test + j])
        }
    }

    return replacements;
}


export function partTwo(rawData: string[]): PuzzleReturn {
    const [elements, rules] = parseData(rawData)

    const repMap = getCreates(rules)

    let pairMap = new Map<string, number>();

    for (const [k, v] of repMap) {
        pairMap.set(k, 0)
        pairMap.set(v[0], 0)
        pairMap.set(v[1], 0)
    }

    for (let i = 1; i < elements.length; i++) {
        const pair = elements.substring(i - 1, i + 1)
        const chem = pairMap.get(pair)
        if (chem === undefined) {
            pairMap.set(pair, 1)
        } else {
            pairMap.set(pair, chem + 1)
        }
    }

    for (let i = 0; i < 40; i++) {
        pairMap = runStep2(pairMap, repMap)

        let total = 0
        for (const [k, v] of pairMap) {
            total += v
        }

    }

    const counts = new Map<string, number>();

    for(const [k, v] of pairMap){

        const amount = v/2
        const first = k[0]
        const second = k[1]

        const firstCount = counts.get(first)

        if(firstCount!== undefined){
            counts.set(first , firstCount+amount)
        } else{
            counts.set(first, amount)
        }

        const secondCount = counts.get(second)
        if(secondCount!== undefined){
            counts.set(second , secondCount+amount)
        } else{
            counts.set(second, amount)
        }
    }

    for(const [k, v] of counts){
        counts.set(k, Math.ceil(v))
    }

    return getAnswer(counts)
}


export default {
    title: "Extended Polymerization",
    year: 2021,
    day: 14,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle