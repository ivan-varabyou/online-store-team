import { getStarsRatting } from './getStarsRatting';

test('GetStarsRatting should return array names class stars for rating', () => {
  const result1 = [
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-half',
  ];
  expect(getStarsRatting(4.4)).toEqual(result1);

  const result2 = [
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
  ];
  expect(getStarsRatting(5)).toEqual(result2);

  const result3 = [
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-fill',
    'bi bi-star-half',
    'bi bi-star',
  ];
  expect(getStarsRatting(3.6)).toEqual(result3);
});
