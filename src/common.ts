import { readFileSync } from "fs";

export function getData(input: string): string[] {
    // I don't expect this ever to be a large file.
    const file = readFileSync(input, 'utf-8');

    return file
        .split("\r\n");
}

export interface Puzzle {
    partOne: (input:string) => any;
    partTwo: (input:string) => any;
}

// Standard modulo for now, as is 0 based.
export function wrappedIndex(targetIndex: number, listLength: number) : number {
    return targetIndex % listLength;
}