import {enhanceImage, getBounds, getPixelValue, parseInput, print} from "./day20";
import {Point} from "./point";


const testData = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`

test('parses', ()=>{
    const [iea, image] = parseInput(testData.split('\n'))

    expect(iea).toHaveLength(512)
    expect(image.size).toBe(10)
})

test('gets bounds', ()=>{
    const [iea, image] = parseInput(testData.split('\n'))

    const [tl, br] = getBounds(image, 2)
    expect(tl).toMatchObject({x: -2, y:0})
    expect(br).toMatchObject({x: 6, y:8})
})

test('gets point', ()=>{
    const [iea, image] = parseInput(testData.split('\n'))

    const val = getPixelValue(new Point(2, 5), image, iea, true)

    expect(val).toBe(false)

})

test('works (2)', ()=>{
    const [iea, image] = parseInput(testData.split('\n'))

    const image2 = enhanceImage(image, iea, true)

    const image3 = enhanceImage(image2, iea, false)

    expect(image3.size).toBe(35)
})