import { getData } from "./common";

interface Point {
    x: number
    y: number
}

interface Instruction {
    start: Point
    end: Point
}

type Grid = Map<string, number>

const dataRegex = RegExp(/^(?<x1>\d*),(?<y1>\d*) -> (?<x2>\d*),(?<y2>\d*)$/)

export function parseData(input: string[]): Instruction[] {
    return input.map(line => {
        var match = dataRegex.exec(line)
        return {
            start: { x: parseInt(match?.groups?.x1 ?? "0"), y: parseInt(match?.groups?.y1 ?? "0") },
            end: { x: parseInt(match?.groups?.x2 ?? "0"), y: parseInt(match?.groups?.y2 ?? "0") }
        }
    });
}

export function applyLines(insList: Instruction[], supportDiagonal: boolean): Grid {
    const grid: Grid = new Map<string, number>();

    for (let i = 0; i < insList.length; i++) {
        const ins = insList[i]

        let { start, end } = ins

        if (start.x === end.x || start.y === end.y) {
            //horizontal, vertical line
          
            if (start.y === end.y && start.x < end.x) {
                for (let x = start.x; x <= end.x; x++) {
                    checkCell(x, start.y, grid)
                }
            } else if (start.y === end.y && start.x > end.x) {
                for (let x = start.x; x >= end.x; x--) {
                    checkCell(x, start.y, grid)
                }
            } else if (start.x === end.x && start.y < end.y) {
                for (let y = start.y; y <= end.y; y++) {
                    checkCell(start.x, y, grid)
                }
            } else if (start.x === end.x && start.y > end.y) {
                for (let y = start.y; y >= end.y; y--) {
                    checkCell(start.x, y, grid)
                }
            }
        } else{
            if (supportDiagonal){
                const steps = Math.abs(start.x - end.x)

                let [xInc, yInc] = [1,1]

                if(start.x > end.x){
                    xInc= -1
                }

                if(start.y > end.y){
                    yInc=-1
                }

                let [x, y] = [start.x, start.y]
                for(let i=0; i <= steps; i++){
                    checkCell(x,y, grid)
                    x+= xInc
                    y+= yInc
                }

            }
        }
    }

    return grid;
}

function checkCell(x: number, y: number, g: Grid) {
    const p = `${x}-${y}`

    if (g.has(p)) {
        const cell = g.get(p)

        if (cell === undefined) {
            throw new Error('how could this even happen? :sadface:');
        }
        g.set(p, cell + 1)

    } else {
        g.set(p, 1)
    }
}

export function countIntersectingPoints(grid: Grid): number {
    let intersects = 0
    for (let [_, value] of grid) {
        if (value > 1) {
            intersects++
        }
    }

    return intersects
}

export function PartOne(inputFile: string): number {
    const data = parseData(getData(inputFile))
    const grid = applyLines(data, false)
    return countIntersectingPoints(grid)
}

export function PartTwo(inputFile: string): number {
    const data = parseData(getData(inputFile))
    const grid = applyLines(data, true)
    return countIntersectingPoints(grid)
}