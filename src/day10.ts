import { getData } from "./common";

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

export function PartOne(filename: string) : any {

    const data = getData(filename);
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

export function PartTwo(filename: string) : any {
    const data = getData(filename);

    for (let i = 0; i < data.length; i++) {
        let chunk: Chunk = { delimter: data[i][0], closed: false, subChunks: [] }

        try {
            readLine(data[i], 1, chunk)
        } catch {
           // ignore
        }

        
    }


}