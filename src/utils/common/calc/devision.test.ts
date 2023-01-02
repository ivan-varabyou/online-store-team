import { devision } from './devision';

test('Devision should return the devision of two numbers', () => {
  expect(devision(155, 5)).toEqual(31);
  expect(devision(20, 2)).toEqual(10);
  expect(devision(240, 120)).toEqual(2);
});

test('Devision should return the Infinity when dividing a number by zero', () => {
  expect(devision(1, 0)).toEqual(Infinity);
  expect(devision(40, 0)).toEqual(Infinity);
  expect(devision(554, 0)).toEqual(Infinity);
});
