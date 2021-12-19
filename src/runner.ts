import {run} from "./common";
import {puzzleList} from "./puzzles";

if (process.argv.length != 4) {
    console.log("Useage: ts-node ./src/index.ts <day to run> <file to process>")
}

const input: number = parseInt(process.argv[2])
const filePath = process.argv[3]
const puzzToRun = puzzleList.find(p => p.day === input)

if (!puzzToRun) {
    console.log("Puzzle not implemented yet");
} else {
    run(puzzToRun, filePath)
}

