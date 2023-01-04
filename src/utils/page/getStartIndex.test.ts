import { getStartIndex } from './getStartIndex';

test('getStartIndex should return index start item ', () => {
  expect(getStartIndex(1, 30)).toBe(0);
  expect(getStartIndex(2, 30)).toBe(30);
  expect(getStartIndex(10, 30)).toBe(270);
});
