import { sum } from './sum';

test('Sum should return the sum of two numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(5, 5)).toEqual(10);
  expect(sum(100, 100)).toEqual(200);
});

test('Sum should return value currenctly comparing to other', () => {
  expect(sum(2, 4)).toBeGreaterThan(5);
  expect(sum(175, 155)).toBeGreaterThan(300);
  expect(sum(10, 20)).toBeGreaterThan(25);
});
