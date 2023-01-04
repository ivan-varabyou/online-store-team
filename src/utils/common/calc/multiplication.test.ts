import { multiplication } from './multiplication';

test('Multiplication should return the miltiplication of two numbers', () => {
  expect(multiplication(5, 5)).toBe(25);
  expect(multiplication(15, 25)).toBe(375);
  expect(multiplication(11556844, 669855)).toBe(7741409737620);
});

test('Multiplication ыhould return NaN when multiplying a number by string or undefined', () => {
  expect(multiplication(5, 'string')).toBeNaN();
  expect(multiplication(15, 'string')).toBeNaN();
  expect(multiplication(11556844, undefined)).toBeNaN();
});
