import {nextStep, parseData, withinRange} from "./day17";
import {Point} from "./day09";

const testData = 'target area: x=20..30, y=-10..-5';

test('it parses', () => {
    const[tl, br]= parseData(testData);

    expect(tl).toMatchObject({x : 20, y: -5})
    expect(br).toMatchObject({x : 30, y: -10})
})

test('part one works', () => {
    const[tl, br]= parseData(testData);
    let maxY = 0;
    let willHit = 0;
    for (let x = 1; x <=br.x; x++){
        for (let y = br.y; y <=br.x; y++){
            let probing = true
            let [pos, vel] = [new Point(0,0), new Point(x, y)]

            let tempMaxY = 0
            while(probing){
                [pos, vel] = nextStep(pos, vel)

                if(pos.y > tempMaxY){
                    tempMaxY = pos.y
                }

                if(withinRange(pos, tl, br) ){
                    willHit++
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

    expect(maxY).toBe(45)
    expect(willHit).toBe(112)
})

test('part two works', () => {

})
