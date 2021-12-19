import {getAnswer, getElementCounts, parseData, runStep} from "./day14";

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

test('exploring', ()=>{
    const [elements, rules] = parseData(testData)

    let elementTemp = elements
    for (let i =0; i<40; i++){
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
    for (let i =0; i<10; i++){
        elementTemp = runStep(elementTemp, rules)
    }

    const counts = getElementCounts(elementTemp)

    expect(getAnswer(counts)).toBe(1588)
})

test('part two works', () => {

})