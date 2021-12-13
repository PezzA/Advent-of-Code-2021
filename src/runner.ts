import * as Day1 from './day01'
import * as Day2 from './day02'
import * as Day3 from './day03'
import * as Day4 from './day04'
import * as Day5 from './day05'
import * as Day6 from './day06'
import * as Day7 from './day07'
import * as Day08 from './day08'
import * as Day09 from './day09'
import * as Day10 from './day10'
import * as Day11 from './day11'
import * as Day12 from './day12'
import * as Day13 from './day13'
import * as Day14 from './day14'
import {performance} from 'perf_hooks'
import {getData, puzzleReturn} from "./common";

if (process.argv.length != 4) {
    console.log("Useage: ts-node ./src/index.ts <day to run> <file to process>")
}

const input: number = parseInt(process.argv[2])
const filePath = process.argv[3]
/*
if (input === 1) {
    console.log("part one: ", Day1.partOne(filePath))
    console.log("part two: ", Day1.partTwo(filePath))
} else if (input === 2) {
    console.log("part one: ", Day2.PartOne(filePath))
    console.log("part two: ", Day2.PartTwo(filePath))
} else if (input === 3) {
    console.log("part one: ", Day3.PartOne(filePath))
    console.log("part two: ", Day3.PartTwo(filePath))
} else if (input === 4) {
    console.log("part one: ", Day4.PartOne(filePath))
    console.log("part two: ", Day4.PartTwo(filePath))
} else if (input === 5) {
    console.log("part one: ", Day5.PartOne(filePath))
    console.log("part Two: ", Day5.PartTwo(filePath))
} else if (input === 6) {
    console.log("part one: ", Day6.PartOne(filePath))
    console.log("part Two: ", Day6.PartTwo(filePath))
} else if (input === 7) {
    console.log("part one: ", Day7.PartOne(filePath))
    console.log("part Two: ", Day7.PartTwo(filePath))
} else if (input === 8) {
    run(Day08.PartOne, Day08.PartTwo, filePath);
} else if (input === 9) {
    run(Day09.PartOne, Day09.PartTwo, filePath);
} else if (input === 10) {
    run(Day10.PartOne, Day10.PartTwo, filePath);
} else if (input === 11) {
    run(Day11.PartOne, Day11.PartTwo, filePath);
} else if (input === 12) {
    run(Day12.PartOne, Day12.PartTwo, filePath);
} else */
if (input === 13) {
    run(Day13.PartOne, Day13.PartTwo, filePath);
} else if (input === 14) {
    run(Day14.PartOne, Day14.PartTwo, filePath);
}

function run(p1: { (data: string[]): puzzleReturn }, p2: { (data: string[]): puzzleReturn }, filePath: string) {
    const data = getData(filePath)
    runPuzzlePart(p1, data, "Part One")
    runPuzzlePart(p2, data, "Part Two")
}

function runPuzzlePart(puzzlePart: { (data: string[]): puzzleReturn }, data: string[], displayText: string) {
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




