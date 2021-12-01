import * as Day1 from './day01'


if(process.argv.length != 4) {
    console.log("Useage: ts-node ./src/index.ts <day to run> <file to process>")
}

const input : number = parseInt(process.argv[2])
const filePath = process.argv[3]

if(input === 1){
    console.log("part one: ", Day1.partOne(filePath))
    console.log("part two: ", Day1.partTwo(filePath))    
}

