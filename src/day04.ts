import { Puzzle, PuzzleReturn} from "./common"


interface BingoNumber {
    value: number
    marked: boolean
}

function callNumber(call: number, cards: BingoNumber[][]) {
    cards.forEach(card => callCard(call, card))
}

function callCard(call: number, card: BingoNumber[]) {
    card.forEach(c => {
        if (call === c.value) {
            c.marked = true
        }
    })
}

const cardRows = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24]]
const cardCols = [[0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24]]

// dont like
function scoredCard(card: BingoNumber[]) {
    for (let i = 0; i < cardRows.length; i++) {
        const row = cardRows[i]
        if (card[row[0]].marked && card[row[1]].marked && card[row[2]].marked && card[row[3]].marked && card[row[4]].marked) {
            return true;
        }
    }

    for (let i = 0; i < cardCols.length; i++) {
        const col = cardCols[i]
        if (card[col[0]].marked && card[col[1]].marked && card[col[2]].marked && card[col[3]].marked && card[col[4]].marked) {
            return true;
        }
    }

    return false
}

function getUnmarkedCount(card: BingoNumber[]) {
    let total = 0;

    card.forEach(e => {
        if (!e.marked) {
            total += e.value
        }
    });

    return total;
}

export function parseData(input: string[]): [number[], BingoNumber[][]] {
    let callingOrder: number[] = []
    let cards: BingoNumber[][] = []
    let card: BingoNumber[] = []

    callingOrder = input[0].split(',').map(val => parseInt(val));

    for (let i = 1; i < input.length; i++) {
        if (input[i] === "") {
            if (card.length > 0) {
                cards.push(card)
                card = []
            }
            continue
        }

        const bits = input[i].split(' ')

        bits.forEach(b => {
            if (b !== "") {
                card.push({ value: parseInt(b), marked: false })
            }
        })
    }
    cards.push(card)

    return [callingOrder, cards]
}

export function solve(calls: number[], cards: BingoNumber[][]): number {
    let answer = 0
    for (let i = 0; i < calls.length; i++) {
        callNumber(calls[i], cards)

        const winner = cards.find(scoredCard)

        if (winner !== undefined) {
            answer = calls[i] * getUnmarkedCount(winner)
            break
        }
    }

    return answer
}

export function lastWinner(calls: number[], cards: BingoNumber[][]): number {
    let completed: number[] = []
    for (let i = 0; i < calls.length; i++) {
        callNumber(calls[i], cards)

        for (let ci = 0; ci < cards.length; ci++) {

            if (scoredCard(cards[ci]) && completed.find(v => ci === v) === undefined) {
                if (completed.length === cards.length - 1) { // at the point we are about to add the last card to the completed list
                    return calls[i] * getUnmarkedCount(cards[ci])
                }
                completed.push(ci)
            }
        }
    }

    return 0
}

export function partOne(input: string[]): PuzzleReturn {
    const [calls, cards] = parseData(input)
    return solve(calls, cards)
}

export function partTwo(input: string[]): PuzzleReturn {
    const [calls, cards] = parseData(input)
    return lastWinner(calls, cards)
}

export default {
    title: "Giant Squid",
    year: 2021,
    day: 4,
    partOne: partOne,
    partTwo: partTwo
} as Puzzle