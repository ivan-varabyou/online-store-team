import { getLocalStorage } from '../localStorage';

export function getCartTotal(): number {
  if (getLocalStorage('cart').length > 0) {
    const products = getLocalStorage('cart');
    return products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);
  }
  return 0;
}
