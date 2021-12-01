import { parseLine, PasswordPolicy, validate, validatePositions } from "./day02";


test('parseLine succesfully parse', () => {
  expect(parseLine('1-3 a: abcde'))
    .toMatchObject({ min: 1, max: 3, char: 'a', password: 'abcde' })
});

const cases : [PasswordPolicy, boolean, boolean][] = [
  [{ min: 1, max: 3, char: 'a', password: 'abcde' }, true, true],
  [{ min: 1, max: 3, char: 'b', password: 'cdefg' }, false, false],
  [{ min: 2, max: 9, char: 'c', password: 'ccccccccc' }, true, false]
];

test.each(cases)("validate(%s) should be %s", (policy, expected, _) => {
  expect(validate(policy)).toEqual(expected);
});

test.each(cases)("validatePositions(%s) should be %s", (policy, _, expected) => {
  expect(validatePositions(policy)).toEqual(expected);
});