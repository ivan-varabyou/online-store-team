import { getLocalStorage } from '../localStorage';

export function getCartDiscountTotal(): number {
  return getLocalStorage('cart')
    .map((product) =>
      Math.ceil(
        product.price + (product.price / 100) * product.discountPercentage,
      ),
    )
    .reduce((acc, curr) => acc + curr, 0);
}
