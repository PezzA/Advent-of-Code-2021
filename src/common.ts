import { readFileSync } from "fs";
import {performance} from "perf_hooks";
import {
    bgBlack,
    bgBlue,
    bgMagenta,
    bright, dim,
    fgCyan,
    fgGreen,
    fgMagenta,
    fgWhite,
    fgYellow,
    reset
} from "./console-colours";

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
    console.log("")
    console.log(`--- ${bright}${puzzle.year}${reset}, Day ${fgYellow}${puzzle.day}${reset}: ${bright}${puzzle.title}${reset} ---`)
    console.log("")
    runPuzzlePart(puzzle.partOne, data, 'One')
    runPuzzlePart(puzzle.partTwo, data, 'Two')
    console.log("")
}

function runPuzzlePart(puzzlePart: { (data: string[]): PuzzleReturn }, data: string[], displayText: string) {
    const start = performance.now()
    const result = puzzlePart(data)
    const end = performance.now()

    const ms = (end - start).toFixed(5);
    if (Array.isArray(result)) {
        console.log(`  ${fgGreen}${displayText}${reset}: ${reset}${fgCyan}${ms}${reset}${dim}ms${reset}\t : (output below)`)
        console.log("")
        for (const item of result) {
            console.log(`  ${bgBlack}${item}${reset}`)
        }
    } else {
        console.log(`  ${fgGreen}${displayText}${reset}: ${reset}${fgCyan}${ms}${reset}${dim}ms${reset}\t : ${fgYellow}${result}${reset}`,)
    }
}
