import { getData } from './common';

function parseData(input: string[]): number[] {
    return input.map(e => parseInt(e));
}

export function partOne(input: string): string | number {
    const measurements = parseData(getData(input));


    let increases = 0;
    let prev: number = 0;

    for (let i = 0; i < measurements.length; i++) {
        if (i === 0) {
            prev = measurements[i]
            continue
        }

        if (measurements[i] > prev) {
            increases++
        }

        prev = measurements[i]
    }

    return increases;
}

export function partTwo(input: string): any {
    const measurements = parseData(getData(input));

    let increases = 0;
    let prev: number = 0;
    for (let i = 2; i < measurements.length; i++) {
        if (i === 2) {
            prev = measurements[i] + measurements[i - 1] + measurements[i - 2]
            continue
        }

        const newMeasurement = measurements[i] + measurements[i - 1] + measurements[i - 2]

        if (newMeasurement > prev) {
            increases++
        }

        prev = newMeasurement
    }
    return increases;
}
