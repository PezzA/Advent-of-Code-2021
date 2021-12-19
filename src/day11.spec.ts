import { parseData, processStep } from "./day11";
import {scoreLine} from "./day10";

const test1 = `11111
19991
19191
19991
11111`.split('\n');

const test2=`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n');

test('it should count flashes', () => {
    const [grid, _, __] = parseData(test1)

    const flashes = processStep(grid)

    expect(flashes).toBe(9)
});

test('it should work', () => {
    const [grid, _, __] = parseData(test2)

    let totalF = 0;

    for(let i=0; i<100; i++){
        totalF+= processStep(grid)
    }

    expect(totalF).toBe(1656)
});

test('it should work part 2', () => {
    const [grid, _, __] = parseData(test2)

    let steps = 1;

    while(true) {
        if(processStep(grid)===100){
            break
        }
        steps++
    }

    expect(steps).toBe(195)
});


test('scores', ()=>{
    expect(scoreLine('}}]])})]')).toBe(288957)
})