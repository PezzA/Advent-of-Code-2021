import { process, somethingTotal, testAlign } from "./day07";

const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test('is should workout align', () => {
    expect(testAlign(testData, 2, false)).toBe(37) 
    expect(testAlign(testData, 1, false)).toBe(41) 
});

test ('it should work', () =>{
    expect(process(testData, false)).toBe(37);
    expect(process(testData, true)).toBe(168);

    expect(somethingTotal(11)).toBe(66)
    expect(somethingTotal(9)).toBe(45)
});