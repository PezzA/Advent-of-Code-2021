import {  getBasin, getLowPoints, HeightMap, parseData } from "./day09"

const testData =`2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n');

test('it should parse data', ()=> {
    const [data, height, width] = parseData(testData);
    expect(data.get('0-0')).toBe(2)
    expect(height).toBe(5)
    expect(width).toBe(10)
})


test('it should work', ()=>{
    const [data, height, width] = parseData(testData);
    //expect(addLowPoints(data, width, height)).toBe(15)

    const lowPoints = getLowPoints(data, width, height)

    const basin : HeightMap = new Map<string, number>();

    getBasin(lowPoints[3], data, basin)

    console.log(basin)
});