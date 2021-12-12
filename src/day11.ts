import { Point } from "./day09";
import {getData} from "./common";

// horribly inefficient for this puzzle, but so easy to use
type Grid = Map<string, Octopus>

interface Octopus {
    flashed: boolean
    energy: number
}
export function parseData(input: string[]): [Grid, number, number] {
    const heightMap: Grid = new Map<string, Octopus>();

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const p = `${x}-${y}`;
            heightMap.set(p, { flashed: false, energy: parseInt(input[y][x]) })
        }
    }

    return [heightMap, input.length, input[0].length];
}

const transforms: Point[] = [
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
]

export function processStep(grid: Grid): number {
    let flashes = 0
    // increment all the values
    for (let [k, v] of grid) {
        v.energy++
        grid.set(k, v)
    }

    let newFlashes = true;

    while (newFlashes === true) {
        newFlashes = false;
        for (let [k, v] of grid) {
            if (v.energy > 9 && !v.flashed) {
                //flash this octopus
                flashes++
                newFlashes = true
                v.flashed = true

                grid.set(k, v)
                let p = Point.fromString(k)

                transforms.forEach(t => {
                    let newPoint = new Point(p.x + t.x, p.y + t.y);

                    let octp = grid.get(newPoint.toString())

                    if(octp !== undefined){
                        octp.energy++
                        grid.set(newPoint.toString(),octp)
                    }
                })
            }
        }
    }


    // reset energy levels
    for (let [k, v] of grid) {
        if (v.energy > 9) {
            v.energy = 0
            v.flashed = false
            grid.set(k, v)
        }
    }

    return flashes
}

export function PartOne(inputfile:string): number {
    const [data, _, __] = parseData(getData(inputfile));
    let totalF = 0;

    for(let i=0; i<100; i++){
        totalF+= processStep(data)
    }

    return totalF
}

export function PartTwo(inputfile:string): number {
    const [grid, _, __] = parseData(getData(inputfile));
    let steps = 1;

    while(true) {
        if(processStep(grid)===100){
            break
        }
        steps++
    }
    return steps
}