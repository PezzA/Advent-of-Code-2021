import { Puzzle, PuzzleReturn} from "./common";
import {Point} from "./day09";

export function parseData(input: string): [Point, Point] {
    const bits = input.split(",");

    const xs = bits[0].split(" ")[2].substring(2).split("..")
    const ys = bits[1].trim().substring(2).split("..")

    return [new Point(parseInt(xs[0]), parseInt(ys[1])), new Point(parseInt(xs[1]), parseInt(ys[0]))]
}

export function withinRange(target: Point, tl: Point, br: Point): boolean {
    return target.x >= tl.x &&
        target.x <= br.x &&
        target.y <= tl.y &&
        target.y >= br.y;
}

export function nextStep(pos: Point, vel: Point): [Point, Point] {
    let xVel = 0;
    if (vel.x > 0) {
        xVel = vel.x - 1
    } else if (vel.x < 0) {
        xVel = vel.x + 1
    }
    return [new Point(pos.x + vel.x, pos.y + vel.y), new Point(xVel, vel.y - 1)]
}

function partOne(input: string[]): PuzzleReturn {
    const[tl, br]= parseData(input[0]);
    let maxY = 0;

    for (let x = 1; x <=br.x; x++){
        for (let y = 1; y <=br.x; y++){
            let probing = true
            let [pos, vel] = [new Point(0,0), new Point(x, y)]

            let tempMaxY = 0
            while(probing){
                [pos, vel] = nextStep(pos, vel)

                if(pos.y > tempMaxY){
                    tempMaxY = pos.y
                }

                if(withinRange(pos, tl, br) ){
                    if (tempMaxY > maxY) {
                        maxY = tempMaxY
                    }

                    probing = false
                }

                if( pos.x > br.x || pos.y < br.y){
                    probing = false
                }
            }
        }
    }
    return maxY
}

function partTwo(input: string[]): PuzzleReturn {
    const[tl, br]= parseData(input[0]);

    let willHit = 0;
    for (let x = 1; x <=br.x; x++){
        for (let y = br.y; y <=br.x; y++){
            let probing = true
            let [pos, vel] = [new Point(0,0), new Point(x, y)]

            while(probing){
                [pos, vel] = nextStep(pos, vel)

                if(withinRange(pos, tl, br) ){
                    willHit++
                    probing = false
                }

                if( pos.x > br.x || pos.y < br.y){
                    probing = false
                }
            }
        }
    }
    return willHit
}

export default {
    title: "Trick Shot",
    year: 2021,
    day: 17,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle