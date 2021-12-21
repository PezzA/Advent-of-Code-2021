import {Puzzle, PuzzleReturn} from "./common";

export function parseData(input: string[]): [number, number] {
    return [
        parseInt(input[0][input[0].length - 1]),
        parseInt(input[1][input[1].length - 1])
    ]
}

export class Die {
    constructor(val: number) {
        this.value =val;
        this.rolls = 0
    }

    value:number;
    rolls: number

    roll(): number {
        this.rolls++;

        if(!this.value) {
            this.value = 0;
        }

        if(this.value === 100){
            this.value = 1;
        } else {
            this.value++;
        }

        return this.value;
    }

    threeRolls(): number {
        return this.roll() + this.roll() + this.roll();
    }
}

export function wrappedIndex(position: number, mod: number, max:number): number{
    let newPos = (position+ mod) % max

    if(newPos === 0){
        newPos = max
    }
    return newPos
}

export function play(p1Pos:number, p2Pos: number): number{
    let [p1Score, p2Score] = [0,0]

    const dd = new Die(0)
    let playerOneTurn = true

    while(true){
      const roll = dd.threeRolls()

        if(playerOneTurn) {
            p1Pos = wrappedIndex(p1Pos, roll,10)
            p1Score+= p1Pos
            if(p1Score >= 1000){
                return p2Score * dd.rolls
            }
        } else{
            p2Pos = wrappedIndex(p2Pos, roll,10)
            p2Score+= p2Pos
            if(p2Score >= 1000){
                return p1Score * dd.rolls
            }
        }

        playerOneTurn = !playerOneTurn
    }

}
function partOne(input: string[]): PuzzleReturn {
    const [p1, p2] = parseData(input)

    return play(p1, p2)
}


function partTwo(input: string[]): PuzzleReturn {
    return "not implemented"
}

export default {
    title: "Dirac Dice",
    year: 2021,
    day: 21,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle