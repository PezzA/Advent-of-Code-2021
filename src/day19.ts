import {Puzzle, PuzzleReturn} from "./common";

interface Point3D {
    x: number;
    y: number;
    z: number;
}

export function p3dManhattan(p1: Point3D, p2: Point3D) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) + Math.abs(p1.z - p2.z)
}

export const transforms: { (point: Point3D): Point3D; } [] = [
    p => {
        return {x: p.x, y: p.y, z: p.z}
    },
    p => {
        return {x: p.x, y: -p.z, z: p.y}
    },
    p => {
        return {x: p.x, y: -p.y, z: -p.z}
    },
    p => {
        return {x: p.x, y: p.z, z: -p.y}
    },
    p => {
        return {x: -p.y, y: p.x, z: p.z}
    },
    p => {
        return {x: p.z, y: p.x, z: p.y}
    },
    p => {
        return {x: p.y, y: p.x, z: -p.z}
    },
    p => {
        return {x: -p.z, y: p.x, z: -p.y}
    },
    p => {
        return {x: -p.x, y: -p.y, z: p.z}
    },
    p => {
        return {x: -p.x, y: -p.z, z: -p.y}
    },
    p => {
        return {x: -p.x, y: p.y, z: -p.z}
    },
    p => {
        return {x: -p.x, y: p.z, z: p.y}
    },
    p => {
        return {x: p.y, y: -p.x, z: p.z}
    },
    p => {
        return {x: p.z, y: -p.x, z: -p.y}
    },
    p => {
        return {x: -p.y, y: -p.x, z: -p.z}
    },
    p => {
        return {x: -p.z, y: -p.x, z: p.y}
    },
    p => {
        return {x: -p.z, y: p.y, z: p.x}
    },
    p => {
        return {x: p.y, y: p.z, z: p.x}
    },
    p => {
        return {x: p.z, y: -p.y, z: p.x}
    },
    p => {
        return {x: -p.y, y: -p.z, z: p.x}
    },
    p => {
        return {x: -p.z, y: -p.y, z: -p.x}
    },
    p => {
        return {x: -p.y, y: p.z, z: -p.x}
    },
    p => {
        return {x: p.z, y: p.y, z: -p.x}
    },
    p => {
        return {x: p.y, y: -p.z, z: -p.x}
    },
];

export class Scanner {
    constructor() {
        this.id = ""
        this.blips = []
        this.offset = {x: 0, y: 0, z: 0}
    }

    id: string;
    blips: Point3D[];
    offset: Point3D;

}

export function parseData(input: string[]): Scanner[] {
    const scannerRegex = /--- scanner (?<id>\d+) ---/
    let scanners: Scanner[] = []
    let scanner = new Scanner();

    let first = true

    for (const line of input) {
        const m = line.match(scannerRegex)
        if (m) {
            scanner.id = m.groups?.id ?? ""
            continue
        }

        if (line === "") {
            scanners.push(scanner)
            scanner = new Scanner()
            continue
        }

        const bits = line.split(',');

        scanner.blips.push({x: parseInt(bits[0]), y: parseInt(bits[1]), z: parseInt(bits[2])})
    }
    scanners.push(scanner)
    return scanners
}

export function compare(master: Scanner, compare: Scanner): [boolean, Scanner] {
    for (const transform of transforms) {
        let offsets = new Map<string, number>();
        for (const mb of master.blips) {
            for (const rawB of compare.blips) {
                const b = transform(rawB)

                const key = `${mb.x - b.x}|${mb.y - b.y}|${mb.z - b.z}`

                const mapItem = offsets.get(key)

                if (mapItem === undefined) {
                    offsets.set(key, 1)
                } else {
                    offsets.set(key, mapItem + 1)
                }
            }
        }

        for (const [k, v] of offsets) {
            const bits = k.split('|')

            const p: Point3D = {x: parseInt(bits[0]), y: parseInt(bits[1]), z: parseInt(bits[2])}

            if (v >= 12) {
                let newScan = new Scanner();

                newScan.id = compare.id
                newScan.blips = compare.blips.map(b => {
                    const spunB = transform(b)
                    return {x: spunB.x + p.x, y: spunB.y + p.y, z: spunB.z + p.z}
                })
                newScan.offset = p

                return [true, newScan]
            }
        }
    }

    return [false, new Scanner()]
}
export function getPositionedScanners(scanners: Scanner[]): Scanner[] {
    const masterScanner = scanners.shift()

    const positionedScanners: Scanner[] = []
    if (masterScanner) {
        positionedScanners.push(masterScanner)
    }

    let unPositionedScanners: Scanner[] = scanners;

    while (unPositionedScanners.length > 0) {
        let foundScanner: Scanner = new Scanner();

        let found = false;

        for (const master of positionedScanners) {
            for (const cmp of unPositionedScanners) {
                const [match, positionedScanner] = compare(master, cmp)

                if (match) {
                    found = true
                    foundScanner = positionedScanner
                    break;
                }
            }
            if (found) {
                break;
            }
        }

        if (found) {
            unPositionedScanners = unPositionedScanners.filter(s => s.id !== foundScanner.id)
            positionedScanners.push(foundScanner)
        }
    }

    return positionedScanners
}

function partOne(input: string[]): PuzzleReturn {
    const scanners = parseData(input)
    const positionedScanners = getPositionedScanners(scanners)
    const beacons = new Map<string, boolean>()

    for (const scan of positionedScanners) {
        for (const beacon of scan.blips) {
            beacons.set(`${beacon.x}|${beacon.y}|${beacon.z}`, true)
        }
    }

    return beacons.size
}

function partTwo(input: string[]): PuzzleReturn {
    const scanners = parseData(input)
    const positionedScanners = getPositionedScanners(scanners)

    let max = 0
    for(const scan1 of positionedScanners){
        for(const scan2 of positionedScanners) {
            if(scan1.id === scan2.id){
                continue
            }
            const dist = p3dManhattan(scan1.offset, scan2.offset)
            if(dist> max){
                max = dist
            }
        }
    }

    return max
}

export default {
    title: "Beacon Scanner",
    year: 2021,
    day: 19,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle