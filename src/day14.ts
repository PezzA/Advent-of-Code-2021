import {PuzzleReturn} from "./common";

type InsertionMap = Map<string, string>

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

export function PartOne(rawData: string[]): PuzzleReturn {
    const [elements, rules] = parseData(rawData)

    let elementTemp = elements
    for (let i =0; i<10; i++){
        elementTemp = runStep(elementTemp, rules)
    }

    const counts = getElementCounts(elementTemp)

    return getAnswer(counts)
}

export function PartTwo(rawData: string[]): PuzzleReturn {
    const [elements, rules] = parseData(rawData)

    let elementTemp = elements
    for (let i =0; i<10; i++){
        elementTemp = runStep(elementTemp, rules)
    }

    const counts = getElementCounts(elementTemp)

    return getAnswer(counts)
}
