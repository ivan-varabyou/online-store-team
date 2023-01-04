import { getMaxCountPage } from './getMaxCountPage';

test('getMaxCountPage should return count pages', () => {
  expect(getMaxCountPage(10, 5)).toBe(2);
  expect(getMaxCountPage(100, 3)).toBe(34);
  expect(getMaxCountPage(9000, 30)).toBe(300);
});
