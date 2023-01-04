export function getStarsRatting(rating: number): string[] {
  const result = [];
  const starFill = 'bi bi-star-fill';
  const starHalf = 'bi bi-star-half';
  const starZero = 'bi bi-star';
  const fullStar = Math.trunc(rating);
  let remnantStar = rating % fullStar;
  for (let i = 1; i <= 5; i++) {
    if (fullStar >= i) {
      result.push(starFill);
    } else if (remnantStar > 0) {
      remnantStar = 0;
      result.push(starHalf);
    } else {
      result.push(starZero);
    }
  }
  return result;
}
