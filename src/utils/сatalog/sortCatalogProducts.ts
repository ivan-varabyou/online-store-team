import { IResultProduct } from '../../models';

export function sortCatalogProducts(
  result: IResultProduct[],
  sort: string,
): IResultProduct[] {
  const newResults = result;
  newResults.sort((a, b) => a.id - b.id);
  if (sort === 'price-ASC') newResults.sort((a, b) => a.price - b.price);
  if (sort === 'price-DESC') newResults.sort((a, b) => b.price - a.price);
  if (sort === 'rating-ASC') newResults.sort((a, b) => a.rating - b.rating);
  if (sort === 'rating-DESC') newResults.sort((a, b) => b.rating - a.rating);
  if (sort === 'discount-ASC')
    newResults.sort(
      (a, b) =>
        Math.ceil(b.discountPercentage) - Math.ceil(a.discountPercentage),
    );
  if (sort === 'discount-DESC')
    newResults.sort(
      (a, b) =>
        Math.ceil(a.discountPercentage) - Math.ceil(b.discountPercentage),
    );
  return newResults;
}
