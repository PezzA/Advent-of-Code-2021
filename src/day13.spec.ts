import {foldPaper, getPaper, parseData} from "./day13";

const testData =`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.split('\n');

test('It parses', ()=>{
    const [points, folds] = parseData(testData)
    expect(points[0]).toMatchObject({x:6, y:10})
    expect(points[17]).toMatchObject({x:9, y:0})
    expect(points).toHaveLength(18)
    expect(folds[0]).toMatchObject({axis:'y', "pos":7})
})

test('It works', ()=>{
    const [points, folds] = parseData(testData)
    const paper = getPaper(points)
    foldPaper(paper, folds[0])
    expect(paper.size).toBe(17)
})