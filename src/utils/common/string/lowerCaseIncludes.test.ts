import { lowerCaseIncludes } from './lowerCaseIncludes';

test('lowerCaseIncludes ыhould return a boolean search value in a lowercase string', () => {
  expect(lowerCaseIncludes('Alex AND Jhon AnD ADAM', 'and')).toBe(true);
  expect(lowerCaseIncludes('Alex 3123213 AND Jhon AnD ADAM', 'or')).toBe(false);
  expect(lowerCaseIncludes('Alex AND Jhon AnD ADAM string', 'alex')).toBe(true);
});
