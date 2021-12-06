import { getDataAsString } from "./common";


export function parseData(input: string): number[] {
    return input.split(',').map(e => parseInt(e));
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

export function PartOne(filename:string){
    const fish = parseData(getDataAsString(filename))

    return runDays(fish, 80).length
}

export function PartTwo(filename:string){
    const fish = parseData(getDataAsString(filename))

    return runDays(fish, 256).length
}