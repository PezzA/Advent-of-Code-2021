import { wrappedIndex } from "./common";


const cases :[number, number, number][] = [
    [17, 10, 7],
    [10, 10, 0],
    [6, 10, 6],
    [0, 10, 0],
]


describe('wrappedIndex', () => {
    test.each(cases)('target position (%s) wrapped on (%s) should be (%s)', (targetPosition, length, expected) => {
        expect(wrappedIndex(targetPosition, length)).toEqual(expected);
      });
});