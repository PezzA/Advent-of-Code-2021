import { Puzzle, PuzzleReturn} from "./common";

function isOpener(input: string): boolean {
    return input === "[" || input === "{" || input === "<" || input === "(";
}

export interface Chunk {
    delimter: string
    closed: boolean
    subChunks: Chunk[]
}

function correspondingClose(open: string, close: string): boolean {
    return (open === "[" && close === "]") ||
        (open === "{" && close === "}") ||
        (open === "<" && close === ">") ||
        (open === "(" && close === ")")
}

export function readLine(input: string, index: number, c: Chunk): number {
    while (index < input.length) {
        let char = input[index];

        if (correspondingClose(c.delimter, char)) {
            c.closed = true
            return index + 1
        }

        if (isOpener(char)) {
            let newChunk = { delimter: char, closed: false, subChunks: [] }
            c.subChunks.push(newChunk)
            index = readLine(input, index +1, newChunk)
        } else {
            throw new Error(char)
        }
    }

    return index
}


export function stackExceptionReader(input: string): string{
    let stack : string[]=[];

    for(const char of input){
        if(isOpener(char)){
            stack.push(char)
            continue
        }

        const lastChar = stack.pop()

        if(!correspondingClose(lastChar ?? "", char)){
            return char
        }
    }

    return ""
}

export function stackAutocompleter(input: string): string{
    let stack : string[]=[];

    for(const char of input){
        if(isOpener(char)){
            stack.push(char)
            continue
        }

        const lastChar = stack.pop()
    }

    let completed = ""
    while(stack.length >0){
        let openChar = stack.pop();

        if(openChar === undefined){
            throw new Error("should not happen")
        }

        switch (openChar) {
            case "(":
                completed +=")"
                break;
            case "[":
                completed += "]";
                break;
            case "{":
                completed += "}"
                break;
            case "<":
                completed += ">"
        }

    }

    return completed
}

export function partOne(data: string[]) : PuzzleReturn {

    let total = 0

    for(const line of data){
        const res = stackExceptionReader(line)

        switch (res) {
            case ")":
                total += 3
                break;
            case "]":
                total += 57;
                break;
            case "}":
                total += 1197
                break;
            case ">":
                total += 25137
        }
    }

    return total
}

export function partOneOld(data: string[]) : PuzzleReturn {
    let total = 0;

    for (let i = 0; i < data.length; i++) {
        let chunk: Chunk = { delimter: data[i][0], closed: false, subChunks: [] }

        try {
            readLine(data[i], 1, chunk)

        } catch (err: unknown) {
            let val="";
            if (typeof err === "string") {
                val = err
            } else if (err instanceof Error) {
                val = err.message 
            }

            switch (val) {
                case ")":
                    total += 3
                    break;
                case "]":
                    total += 57;
                    break;
                case "}":
                    total += 1197
                    break;
                case ">":
                    total += 25137
            }
        }
    }

    return total;
}

export function scoreLine(input:string): number{
    let total = 0;

    for(const char of input){
        total *= 5
        switch (char) {
            case ")":
                total += 1
                break;
            case "]":
                total += 2;
                break;
            case "}":
                total += 3
                break;
            case ">":
                total += 4
        }
    }

    return total;
}

export function partTwo(input: string[]) : PuzzleReturn {
    let total = 0

    let lines:string[] = []
    let scores: number[] = []
    for(const line of input){
        if(stackExceptionReader(line) === ""){
            const res =stackAutocompleter(line)
           lines.push(res)
            scores.push(scoreLine(res))
        }

    }

    scores.sort((n1,n2) => n1 - n2)
    const mid = Math.ceil(scores.length/2) -1
    return scores[mid]
    // not 1479862
}

export default {
    title: "Syntax Scoring",
    year: 2021,
    day: 10,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle