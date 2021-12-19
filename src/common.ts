import { readFileSync } from "fs";
import {performance} from "perf_hooks";

export function getData(input: string): string[] {
    // I don't expect this ever to be a large file.
    const file = readFileSync(input, 'utf-8');

    return file
        .split("\r\n");
}

export function getDataAsString(input: string): string {
    const file = readFileSync(input, 'utf-8');

    return file;
}

export type PuzzleReturn = string | number | string[]

export interface Puzzle {
    title: string
    year: number
    day: number
    partOne: (input: string[]) => PuzzleReturn;
    partTwo: (input: string[]) => PuzzleReturn;
}

export function run(puzzle: Puzzle, filePath: string) {
    const data = getData(filePath)
    console.log(`--- ${puzzle.year}, Day ${puzzle.day}: ${puzzle.title} ---`)
    runPuzzlePart(puzzle.partOne, data, "Part One")
    runPuzzlePart(puzzle.partTwo, data, "Part Two")
}

function runPuzzlePart(puzzlePart: { (data: string[]): PuzzleReturn }, data: string[], displayText: string) {
    const start = performance.now()
    const result = puzzlePart(data)
    const end = performance.now()

    if (Array.isArray(result)) {
        console.log(`${displayText}: [${end - start}ms]`)
        for (const item of result) {
            console.log(item)
        }
    } else {
        console.log(`${displayText}: ${result}. [${end - start}ms]`,)
    }
}
