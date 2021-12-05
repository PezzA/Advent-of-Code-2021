import * as Day1 from './day01'
import * as Day2 from './day02'
import * as Day3 from './day03'
import * as Day4 from './day04'
import * as Day5 from './day05'

if(process.argv.length != 4) {
    console.log("Useage: ts-node ./src/index.ts <day to run> <file to process>")
}

const input : number = parseInt(process.argv[2])
const filePath = process.argv[3]

if(input === 1){
    console.log("part one: ", Day1.partOne(filePath))
    console.log("part two: ", Day1.partTwo(filePath))    
} else if(input === 2){
    console.log("part one: ", Day2.PartOne(filePath))
    console.log("part two: ", Day2.PartTwo(filePath))
} else if(input === 3){
    console.log("part one: ", Day3.PartOne(filePath))
    console.log("part two: ", Day3.PartTwo(filePath))
} else if(input === 4){
    console.log("part one: ", Day4.PartOne(filePath))
    console.log("part two: ", Day4.PartTwo(filePath))
} else if(input === 5){
    console.log("part one: ", Day5.PartOne(filePath))
    console.log("part Two: ", Day5.PartTwo(filePath))
    
}
