import { readFileSync } from "fs";

export function getData(input: string): string[] {
    // I don't expect this ever to be a large file.
    const file = readFileSync(input, 'utf-8');

    return file
        .split("\r\n");
}

export function getDataAsString(input: string): string {
    // I don't expect this ever to be a large file.
    const file = readFileSync(input, 'utf-8');

    return file;
}

export type PuzzleReturn = string | number | string[]
