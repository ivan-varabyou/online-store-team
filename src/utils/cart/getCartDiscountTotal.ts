import { getLocalStorage } from '../localStorage';

export function getCartDiscountTotal(): number {
  return getLocalStorage('cart')
    .map((product) =>
      Math.ceil(
        (product.price + (product.price / 100) * product.discountPercentage) *
          product.count,
      ),
    )
    .reduce((acc, curr) => acc + curr, 0);
}
