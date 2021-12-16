import {Point} from "./day09";
import {Puzzle, PuzzleReturn} from "./common";


type Grid = number[][]

export interface Assessment {
    path: Point[],
    riskTotal: number
}

export function parseData(input: string[]): Grid {
    let grid: number[][] = []
    for (let y = 0; y < input.length; y++) {
        grid.push([])
        for (let x = 0; x < input.length; x++) {
            grid[y].push(parseInt(input[y][x]))
        }
    }

    return grid;
}

// a quick function to check the walking off, dont expect this to be the
// highest, but will stop any path at this length
export function getLazyRisk(g: Grid): number {
    let lazyRisk = 0
    for (let i = 1; i < g[0].length; i++) {
        lazyRisk += g[0][i]
    }

    const x = g[0].length - 1
    for (let i = 1; i < g.length; i++) {
        lazyRisk += g[i][x]
    }
    return lazyRisk
}
let cutOffRisk = 72

function testWalk(g: Grid, p: Point, assessment: Assessment, completedAssessments: Assessment[]) {
    const incomingRisk = g[p.y][p.x]

    const newRisk = assessment.riskTotal + incomingRisk;
    if (cutOffRisk > newRisk) {
        let newPath = assessment.path.map(e => e)
        newPath.push(p)
        walk(g,  {path: newPath, riskTotal: newRisk}, completedAssessments)
    }
}

export function walk(g: Grid,  assessment: Assessment, completedAssessments: Assessment[]) {

    const currentPos = assessment.path[assessment.path.length - 1]

    if (currentPos.y === g.length - 1 && currentPos.x === g[0].length - 1) {
        if(cutOffRisk ===0 || assessment.riskTotal < cutOffRisk){
            cutOffRisk= assessment.riskTotal
        }
        console.log(cutOffRisk)
        completedAssessments.push(assessment)
        return
    }

    // TODO: REFACTOR into method
    //up
    if (currentPos.y > 0 ) {
        const p = new Point(currentPos.x, currentPos.y - 1)
        if(!assessment.path.find(e => e.x === p.x && e.y === p.y)){
            testWalk(g, p, assessment,  completedAssessments);
        }
    }

    //down
    if (currentPos.y < g.length-1 ) {
        const p = new Point(currentPos.x, currentPos.y + 1)
        if(!assessment.path.find(e => e.x === p.x && e.y === p.y)){
            testWalk(g, p, assessment,  completedAssessments);
        }
    }

    //left
    if (currentPos.x > 0) {
        const p = new Point(currentPos.x - 1, currentPos.y)
        if(!assessment.path.find(e => e.x === p.x && e.y === p.y)){
            testWalk(g, p, assessment,  completedAssessments);
        }
    }

    //right
    if (currentPos.x < g[0].length-1) {
        const p = new Point(currentPos.x + 1, currentPos.y)
        if(!assessment.path.find(e => e.x === p.x && e.y === p.y)){
            testWalk(g, p, assessment, completedAssessments);
        }
    }
}

export function partOne(data: string[]): PuzzleReturn {
    const grid = parseData(data)


    const start: Assessment = {
        path: [new Point(0, 0)],
        riskTotal: 0
    }
    const completedAssessments: Assessment[] = []

    cutOffRisk = getLazyRisk(grid)
    walk(grid, start, completedAssessments)

    let min = 10000;

    for(const assessment of completedAssessments){
        if(assessment.riskTotal < min){
            min = assessment.riskTotal
        }
    }

    return min
}

export function partTwo(data: string[]): PuzzleReturn {
    return 0
}

export default {
    title: "Chiton ",
    year: 2021,
    day: 15,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle
