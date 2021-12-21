// a is in 7 but not in 1
// b is in 4 and 0 but not 1
// e and b appear once, b is in 4 (of 2,3,5)

// c is in 1 not in 5
// d is not 4 but not b


// f in 1 but is not c

// d (of the 6's) is unique to 9 

// d (of the 6's) is unique to 9 
// 9 is 6 signals and contains all of 4

// a, b,c, d,e, f
// 2 - 1
// 3 - 7
// 4 - 4
// 5 - 2, 3, 5
// 6 - 0, 9, 6
// 7 - 8


import { Puzzle, PuzzleReturn} from "./common";

interface Note {
    signals: string[]
    output: string[]
}

export function parseData(inputData: string[]): Note[] {
    let notes: Note[] = inputData.map(line => {
        const bits = line.split('|');

        return {
            signals: bits[0].trim().split(' '),
            output: bits[1].trim().split(' '),
        }
    });

    return notes;
}

// a is in 7 but not in 1
export function detectA(input: string[]): string {

    const one = input.find(s => s.length === 2);
    const seven = input.find(s => s.length === 3);

    if (!one || !seven) {
        throw new Error('assumed will not happen')
    }

    for (let i = 0; i < seven.length; i++) {
        if (one.indexOf(seven[i]) === -1) {
            return seven[i]
        }
    }

    throw new Error('assumed will always find answer')
}

// e and b appear once (in 2,3,5), b is in 4 
export function detectB(input: string[]): string {
    const twoThreeFive = input.filter(i => i.length === 5);
    const four = input.find(i => i.length === 4);

    if (!four || twoThreeFive.length != 3) {
        throw new Error('assumed will not happen')
    }

    let counts = new Map<string, number>();

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            let test = counts.get(twoThreeFive[j][i])

            if (!test) {
                counts.set(twoThreeFive[j][i], 1)
            } else {
                counts.set(twoThreeFive[j][i], test + 1)
            }
        }
    }

    for (let [k, v] of counts) {
        if (v === 1 && four.indexOf(k) !== -1) {
            return k
        }
    }

    throw new Error('assumed will always find answer')
}

// c is in 1 not in 5
export function detectC(input: string[]): string {
    const one = input.find(s => s.length === 2);

    const b = detectB(input)
    const twoThreeFive = input.filter(i => i.length === 5);

    const five = twoThreeFive.find(s => s.indexOf(b) !== -1)

    if (!one || !five) {
        throw new Error('assumed will not happen')
    }

    for (let i = 0; i < one.length; i++) {
        if (five.indexOf(one[i]) === -1) {
            return one[i]
        }
    }
    throw new Error('assumed will always find answer')
}

// d is not 4 but not b or 1
export function detectD(input: string[]): string {
    const one = input.find(s => s.length === 2);
    const four = input.find(i => i.length === 4);
    const b = detectB(input)

    if (!four || !one) {
        throw new Error('assumed will not happen')
    }

    for (let i = 0; i < four.length; i++) {
        if (four[i] !== b && one.indexOf(four[i]) === -1) {
            return four[i]
        }
    }


    throw new Error('assumed will always find answer')
}

export function detectE(input: string[]): string {
    const twoThreeFive = input.filter(i => i.length === 5);
    const four = input.find(i => i.length === 4);

    if (!four || twoThreeFive.length != 3) {
        throw new Error('assumed will not happen')
    }

    let counts = new Map<string, number>();

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            let test = counts.get(twoThreeFive[j][i])

            if (!test) {
                counts.set(twoThreeFive[j][i], 1)
            } else {
                counts.set(twoThreeFive[j][i], test + 1)
            }
        }
    }

    for (let [k, v] of counts) {
        if (v === 1 && four.indexOf(k) === -1) {
            return k
        }
    }

    throw new Error('assumed will always find answer')
}

export function detectF(input: string[]): string {
    const one = input.find(s => s.length === 2);
    const c = detectC(input)

    if (!one) {
        throw new Error('removing the undefined, assumed will not happen')
    }

    for (let i = 0; i < one.length; i++) {
        if (one[i] !== c) {
            return one[i]
        }
    }

    throw new Error('assumed will always find answer')
}

export function mapdigits(input: string[]): Map<string, string> {
    const map = new Map<string, string>([
        [detectA(input), "a"],
        [detectB(input), "b"],
        [detectC(input), "c"],
        [detectD(input), "d"],
        [detectE(input), "e"],
        [detectF(input), "f"]
    ])
    return map
}


export function digitDefs(input: string): number {
    const defs = new Map<string, number>([
        ["abcefg", 0],
        ["cf", 1],
        ["acdeg", 2],
        ["acdfg", 3],
        ["bcdf", 4],
        ["abdfg", 5],
        ["abdefg", 6],
        ["acf", 7],
        ["abcdefg", 8],
        ["abcdfg", 9]
    ]);

    const found = defs.get(input);

    if (found === undefined) {
        throw new Error("what?")
    }
    return found;

}

export function isEasyDigit(input: string): boolean {
    return input.length === 2 || input.length === 3 || input.length === 4 || input.length === 7
}

export function getNumberValue(note: Note) : number {
    const digitSignals = mapdigits(note.signals);

    let stringNumber = ""
    for (let i=0; i< note.output.length; i++){

        const sorted = [...note.output[i]].sort();
        const flippers = sorted.map(e => {
            const found = digitSignals.get(e);
            return found ? found : "g"
        } )

        const sortedFlippers =  [...flippers].sort().join('');

        stringNumber+=digitDefs(sortedFlippers);
    }

    return parseInt(stringNumber)
}

export function partOne(input: string[]): PuzzleReturn {
    const data = parseData(input);

    let total = 0;

    data.forEach(note => {
        note.output.forEach(o => {
            if (isEasyDigit(o)) {
                total++
            }
        })
    })

    return total
}

export function partTwo(input:string[]): PuzzleReturn {
    const data = parseData(input);

    let total=0;

    data.forEach(note => {
        total+=getNumberValue(note)
    });
    return total;
}

export default {
    title: "Seven Segment Search",
    year: 2021,
    day: 8,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle