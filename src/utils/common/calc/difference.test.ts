import { difference } from './difference';

test('Difference should return the difference of two numbers', () => {
  expect(difference(7, 7)).toEqual(0);
  expect(difference(20, 2)).toEqual(18);
  expect(difference(240, 120)).toEqual(120);
});
