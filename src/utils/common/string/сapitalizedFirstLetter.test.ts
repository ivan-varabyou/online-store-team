import { capitalizedFirstLetter } from './сapitalizedFirstLetter';

test('CapitalizedFirstLetter should return a string where the first letter is uppercase', () => {
  expect(capitalizedFirstLetter('brest')).toBe('Brest');
  expect(capitalizedFirstLetter('belarus')).toBe('Belarus');
  expect(capitalizedFirstLetter('alex')).toBe('Alex');
});
