import {Die, parseData, play, wrappedIndex} from "./day21";

const testData =`Player 1 starting position: 4
Player 2 starting position: 8`;

test('parses', ()=>{
    const [p1, p2] = parseData(testData.split('\n'))

    expect(p1).toBe(4)
    expect(p2).toBe(8)
})


test('rolls', ()=>{
    let dd = new Die(0)

    expect(dd.threeRolls()).toBe(6)

    dd = new Die(100)
    expect(dd.threeRolls()).toBe(6)

    dd = new Die(90)
    expect(dd.threeRolls()).toBe(276)

})
test('template', ()=>{
    expect(wrappedIndex(4, 6, 10)).toBe(10)
    expect(wrappedIndex(4, 70, 10)).toBe(4)
    expect(wrappedIndex(4, 60, 10)).toBe(4)
})

test('works', () => {
    const [p1, p2] = parseData(testData.split('\n'))

    expect(play(p1, p2)).toBe(739785)
})

test('template', ()=>{})