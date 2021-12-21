import {cloneMap, Puzzle, PuzzleReturn} from "./common";
import {Point} from "./day09";

type Image = Map<string, boolean>

export function parseInput(input: string[]): [string, Image] {
    let image = new Map<string, boolean>();

    for (let y = 2; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const char = input[y][x];
            if (char === "#") {
                image.set(`${x}|${y - 2}`, true)
            } else {
                image.set(`${x}|${y - 2}`, false)
            }
        }
    }

    return [input[0], image]
}

export function getBounds(image: Image, mod: number): [Point, Point] {
    let [minX, minY, maxX, maxY] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0, 0]

    for (const [k, _] of image) {
        const p = Point.fromString(k);

        if (p.x > maxX) {
            maxX = p.x
        }

        if (p.x < minX) {
            minX = p.x
        }

        if (p.y > maxY) {
            maxY = p.y
        }

        if (p.y < minY) {
            minY = p.y
        }
    }

    return [new Point(minX - mod, minY - mod), new Point(maxX + mod, maxY + mod)]
}

export function getPix(p: Point, image: Image, odd: boolean): string {
    let pixel = image.get(p.toString())

    if (pixel === undefined) {
        return  odd ? "1" : "0"
    }

    return pixel ? "1" : "0"
}

export function getPixelValue(p: Point, image: Image, iea: string, odd: boolean): boolean {
    let binString: string = ""
    binString += getPix(new Point(p.x - 1, p.y - 1), image, odd)
    binString += getPix(new Point(p.x, p.y - 1), image, odd)
    binString += getPix(new Point(p.x + 1, p.y - 1), image, odd)
    binString += getPix(new Point(p.x - 1, p.y), image, odd)
    binString += getPix(new Point(p.x, p.y), image, odd)
    binString += getPix(new Point(p.x + 1, p.y), image, odd)
    binString += getPix(new Point(p.x - 1, p.y + 1), image, odd)
    binString += getPix(new Point(p.x, p.y + 1), image, odd)
    binString += getPix(new Point(p.x + 1, p.y + 1), image, odd)

    const decValue = parseInt(binString, 2)

    return iea[decValue] === "#"
}

export function print(image: Image) {
    console.log("----------")
    const [tl, br] = getBounds(image, 2);
    const grid: string[] = []


    for (let y = 0; y < (br.y - tl.y); y++) {
        let arr = new Array(br.x - tl.x+4).join(`.`)
        grid.push(arr)
    }

    let yOffSet = Math.abs(tl.y)
    let xOffSet = Math.abs(tl.x)

    for (const [k, v] of image) {

        const p = Point.fromString(k)

        const y = p.y + yOffSet
        const x = p.x + xOffSet

        const pix = v ? "#" : ".";
        grid[y] = `${grid[y].substring(0, x)}${pix}${grid[y].substring(x + 1)}`;
    }

    for (const line of grid) {
        console.log(line)
    }
}

export function enhanceImage(image: Image, iea: string, odd: boolean): Image {
    const newImage = new Map<string, boolean>();

    const [tl, br] = getBounds(image, 2);

    for (let x = tl.x; x < br.x; x++) {
        for (let y = tl.y; y < br.y; y++) {
            const p = new Point(x, y)
            if (getPixelValue(p, image, iea, odd)) {
                newImage.set(p.toString(), true)
            } else {
                newImage.set(p.toString(), false)
            }
        }
    }
    return newImage;
}


function partOne(input: string[]): PuzzleReturn {
    const [iea, image] = parseInput(input)

    const image2 = enhanceImage(image, iea, true)
    const image3 = enhanceImage(image2, iea, false)
    print(image)
    print(image2)
    print(image3)
    // not 5592 , 5902(high), 6336 (high) // 4726

    let pix = 0;
    for(const [k, v] of image3){
        if(v){
            pix++
        }
    }
    return pix
}

function partTwo(input: string[]): PuzzleReturn {
    return "not implemented"
}

export default {
    title: "Trench Map",
    year: 2021,
    day: 20,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle