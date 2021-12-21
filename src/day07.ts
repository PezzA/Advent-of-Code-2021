import { Puzzle, PuzzleReturn} from "./common";

export function parseData(inputData: string): number[] {
    return inputData.split(',').map(e => parseInt(e))
}

export function testAlign(subs: number[], pos: number, doActualFuelUse: boolean) {
    let total = 0;

    for (let i = 0; i < subs.length; i++) {
        const shift = Math.abs(subs[i] - pos)

        if (doActualFuelUse) {
            total += somethingTotal(shift)
        } else {
            total += shift
        }
    }

    return total
}

export function somethingTotal(input: number) {
    let total = 0
    for (let i = 1; i <= input; i++) {
        total += i
    }
    return total
}

export function process(subs: number[], doActualFuelUse: boolean): number | undefined {
    const min = Math.min(...subs);
    const max = Math.max(...subs);

    let smallest: number | undefined;

    for (let i = min; i <= max; i++) {
        const fuelCost = testAlign(subs, i, doActualFuelUse);

        if (smallest === undefined || fuelCost < smallest) {
            smallest = fuelCost
        }
    }

    return smallest
}

function partOne(data: string[]): PuzzleReturn {
    return process(parseData(data[0]), false) ?? 0
}

function partTwo(data: string[]): PuzzleReturn {
    return process(parseData(data[0]), true) ?? 0
}

export default {
    title: "The Treachery of Whales",
    year: 2021,
    day: 7,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle