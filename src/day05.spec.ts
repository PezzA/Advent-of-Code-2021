import { applyLines, countIntersectingPoints, parseData } from "./day05"

const testData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

test('it loads the data successfully', () => {
    const data = parseData(testData.split('\n'))

    expect(data.length).toBe(10)
    expect(data[0]).toMatchObject({ start: { x: 0, y: 9 }, end: { x: 5, y: 9 } })
    expect(data[9]).toMatchObject({ start: { x: 5, y: 5 }, end: { x: 8, y: 2 } })
})

test('it works', () => {
    const data = parseData(testData.split('\n'))
    const grid = applyLines(data)
    const val = countIntersectingPoints(grid)

    expect(val).toBe(5)
});