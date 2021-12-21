import {Assessment, getLazyRisk, parseData, walk} from "./day15";
import {Point} from "./point";


const testData = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split('\n')

test('it parses', () => {
    const data = parseData(testData)

    expect(data[0][2]).toBe(6)
})

test('it gets lazy risk', () => {
    const data = parseData(testData)
    expect(getLazyRisk(data)).toBe(75)
})

test('it walks', () => {
    const grid = parseData(testData)

    const start: Assessment = {
        path: [new Point(0, 0)],
        riskTotal: 0
    }

    const completedAssessments: Assessment[] = []
    walk(grid, start, completedAssessments)

    let min = 10000;

    for (const assessment of completedAssessments) {
        if (assessment.riskTotal < min) {
            min = assessment.riskTotal
        }
    }

    expect(min).toBe(40)
})