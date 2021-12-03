import { getData } from "./common";

enum Rating {
    oxygen,
    co2
}

function checkIfGamma(values: string[], index: number): boolean {
    let [ones, zeros] = [0, 0]
    values.forEach(v => {
        if ([...v][index] === "1") {
            ones++
        } else {
            zeros++
        }
    })
    return ones >= zeros
}

function ratingCheck(values: string[], index: number): number[] {
    let [ones, zeros] = [0, 0]
    values.forEach(v => {
        if ([...v][index] === "1") {
            ones++
        } else {
            zeros++
        }
    })
    return [ones, zeros]
}


function getCheckCandidates(values: string[], rating: Rating, index: number): string[] {
    const [ones, zeros] = ratingCheck(values, index)

    let bitToKeep = "";

    if (rating === Rating.oxygen) {
        bitToKeep = ones >= zeros
            ? "1"
            : "0"
    } else {
        bitToKeep = ones < zeros
            ? "1"
            : "0"
    }

    return values.filter(v => [...v][index] === bitToKeep);
}

export function PartOne(input: string): any {
    const data = getData(input);

    let [gamma, epsilon] = ["", ""]

    for (let i = 0; i < data[0].length; i++) {
        if (checkIfGamma(data, i)) {
            gamma += "1"
            epsilon += "0"
        } else {
            gamma += "0"
            epsilon += "1"
        }
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}


function getRating(values: string[], rating: Rating) : number {
    for (let i = 0; i < values[0].length; i++) {
        values = getCheckCandidates(values,rating, i)
        if(values.length === 1) {
            break
        }
    }

    return parseInt(values[0],2)
}

export function PartTwo(input: string): any {
    const data = getData(input);

    return getRating(data, Rating.oxygen) * getRating(data, Rating.co2)
}