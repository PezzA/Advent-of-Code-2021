import { getData } from "./common";

interface instruction {
    command: string
    amount: number
}

interface point {
    x: number
    y: number
    aim: number
}

function parseData(input: string[]): instruction[] {
    return input.map(line => {
        const bits = line.split(' ');
        return {
            command: bits[0],
            amount: parseInt(bits[1])
        }
    })
}

function processInstruction(ins: instruction, currentPos: point): point {
    switch (ins.command) {
        case "forward":
            return {
                x: currentPos.x + ins.amount,
                y: currentPos.y,
                aim: 0
            }
        case "up":
            return {
                x: currentPos.x,
                y: currentPos.y - ins.amount,
                aim: 0
            }
        case "down":
            return {
                x: currentPos.x,
                y: currentPos.y + ins.amount,
                aim: 0
            }
        default:
            throw new Error("unknown command encountered");
    }
}

function processRevisedInstruction(ins: instruction, currentPos: point): point {
    switch (ins.command) {
        case "forward":
            return {
                x: currentPos.x + ins.amount,
                y: currentPos.y + (currentPos.aim * ins.amount),
                aim: currentPos.aim
            }
        case "up":
            return {
                x: currentPos.x,
                y: currentPos.y,
                aim: currentPos.aim - ins.amount
            }
        case "down":
            return {
                x: currentPos.x,
                y: currentPos.y,
                aim: currentPos.aim + ins.amount
            }
        default:
            throw new Error("unknown command encountered");
    }
}

export function PartOne(input: string): number {
    const commands = parseData(getData(input));

    let currentPos: point = { x: 0, y: 0, aim: 0 }
    for (let i = 0; i < commands.length; i++) {
        currentPos = processInstruction(commands[i], currentPos)
    }

    return currentPos.x * currentPos.y
}

export function PartTwo(input: string): number {
    const commands = parseData(getData(input));

    let currentPos: point = { x: 0, y: 0, aim: 0 }
    for (let i = 0; i < commands.length; i++) {
        currentPos = processRevisedInstruction(commands[i], currentPos)
    }

    return currentPos.x * currentPos.y

    // not 419980
}