import { getData, getDataAsString } from "./common";

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

export function PartOne(fileName: string): any {
    return process(parseData(getDataAsString(fileName)), false)
}

export function PartTwo(fileName: string): any {
    return process(parseData(getDataAsString(fileName)), true)
}