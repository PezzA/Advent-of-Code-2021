import {getAnswer, getElementCounts, InsertionMap, parseData, runStep} from "./day14";

const testData = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n');


test('It parses', () => {
    const [elements, rules] = parseData(testData)

    expect(elements).toBe("NNCB");

    expect(rules.get("CH")).toBe("B");
    expect(rules.size).toBe(16)
    expect(rules.get("CN")).toBe("C");
})

test('exploring', () => {
    const [elements, rules] = parseData(testData)

    let elementTemp = elements
    for (let i = 0; i < 40; i++) {
        elementTemp = runStep(elementTemp, rules)
        console.log(i, elementTemp.length)
    }

})
test('part one works', () => {
    const [elements, rules] = parseData(testData)

    const step1 = runStep(elements, rules)
    expect(step1).toBe("NCNBCHB")

    const step2 = runStep(step1, rules)
    expect(step2).toBe("NBCCNBBBCBHCB")

    const step3 = runStep(step2, rules)
    expect(step3).toBe("NBBBCNCCNBBNBNBBCHBHHBCHB")

    const step4 = runStep(step3, rules)
    expect(step4).toBe("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB")

    let elementTemp = elements
    for (let i = 0; i < 10; i++) {
        elementTemp = runStep(elementTemp, rules)
    }

    const counts = getElementCounts(elementTemp)

    expect(getAnswer(counts)).toBe(1588)
})



test('part two works', () => {
    const [elements, rules] = parseData(testData)

    const repMap = getCreates(rules)

    let pairMap = new Map<string, number>();

    for (const [k, v] of repMap) {
        pairMap.set(k, 0)
        pairMap.set(v[0], 0)
        pairMap.set(v[1], 0)
    }

    for (let i = 1; i < elements.length; i++) {
        const pair = elements.substring(i - 1, i + 1)
        const chem = pairMap.get(pair)
        if (chem === undefined) {
            pairMap.set(pair, 1)
        } else {
            pairMap.set(pair, chem + 1)
        }
    }

    for (let i = 0; i < 10; i++) {
        pairMap = runStep2(pairMap, repMap)

        let total = 0
        for (const [k, v] of pairMap) {
            total += v
        }

    }

    const counts = new Map<string, number>();

    for(const [k, v] of pairMap){

        const amount = v/2
        const first = k[0]
        const second = k[1]

        const firstCount = counts.get(first)

        if(firstCount!== undefined){
            counts.set(first , firstCount+amount)
        } else{
            counts.set(first, amount)
        }

        const secondCount = counts.get(second)
        if(secondCount!== undefined){
            counts.set(second , secondCount+amount)
        } else{
            counts.set(second, amount)
        }
    }

    for(const [k, v] of counts){
        counts.set(k, Math.ceil(v))
    }

    console.log(getAnswer(counts))


})

