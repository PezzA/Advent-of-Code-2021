import * as Day1 from './day01'
import * as Day2 from './day02'
import * as Day3 from './day03'
import * as Day4 from './day04'
import * as Day5 from './day05'
import * as Day6 from './day06'
import * as Day7 from './day07'
import * as Day8 from './day08'
import * as Day9 from './day09'
import * as Day10 from './day10'
import * as Day11 from './day11'
import * as Day12 from './day12'

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
}else if(input === 6){
    console.log("part one: ", Day6.PartOne(filePath))
    console.log("part Two: ", Day6.PartTwo(filePath))
    
}else if(input === 7){
    console.log("part one: ", Day7.PartOne(filePath))
    console.log("part Two: ", Day7.PartTwo(filePath))
}else if(input === 8){
    console.log("part one: ", Day8.PartOne(filePath))
    console.log("part Two: ", Day8.PartTwo(filePath))
} else if(input === 9){
    console.log("part one: ", Day9.PartOne(filePath))
    console.log("part Two: ", Day9.PartTwo(filePath))
} else if(input === 10){
    console.log("part one: ", Day10.PartOne(filePath))
    //console.log("part Two: ", Day9.PartTwo(filePath))
} else if(input === 11){
    console.log("part one: ", Day11.PartOne(filePath))
    console.log("part Two: ", Day11.PartTwo(filePath))
} else if(input === 12){
    console.log("part one: ", Day12.PartOne(filePath))
   console.log("part Two: ", Day12.PartTwo(filePath))
}





