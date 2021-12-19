import {getDataAsString, Puzzle, PuzzleReturn} from "./common";


export function parseData(input: string): number[] {
    return input.split(',').map(e => parseInt(e));
}

export function sortAges(input: string): number[]{
    let ages: number[] = Array(9).fill(0)
    for(const val of input.split(',')){
        ages[parseInt(val)]++
    }
    return ages
}

export function ageStep(ages: number[]): number[]{
    const zeros = ages[0]

    ages[0] = ages[1]
    ages[1] = ages[2]
    ages[2] = ages[3]
    ages[3] = ages[4]
    ages[4] = ages[5]
    ages[5] = ages[6]
    ages[6] = ages[7]
    ages[7] = ages[8]

    ages[6] += zeros
    ages[8] = zeros

    return ages
}

export function runList(fish: number[]): number[] {
    
    let newCount= 0;

    for (let i = 0; i < fish.length; i++) {
        if (fish[i] === 0) {
            newCount++
            fish[i] = 6
            continue
        }
        fish[i]--
    }

    for (let i=0; i< newCount;i++){
        fish.push(8)
    }

    return fish
}

export function runDays(fish:number[], daysToRun: number): number[] {
    for(let i=0; i< daysToRun; i++){
        fish = runList(fish)
    }
    return fish
}

export function partOneOLD(data:string[]): PuzzleReturn {
    const fish = parseData(data[0])
    return runDays(fish, 80).length
}

export function partOne(data:string[]): PuzzleReturn {
    let fish = sortAges(data[0])

    for(let i=0; i<80; i++){
        fish = ageStep(fish)
    }

    return fish.reduce( (a, b)  => a+b,0)
}

export function partTwo(data:string[]): PuzzleReturn{
    let fish = sortAges(data[0])

    for(let i=0; i<256; i++){
        fish = ageStep(fish)
    }

    return fish.reduce( (a, b)  => a+b,0)
}

export default {
    title: "Lanternfish ",
    year: 2021,
    day: 6,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle