import { getLocalStorage } from '../localStorage';

export function getCartCount(): number {
  return getLocalStorage('cart')
    .map((product) => product.count)
    .reduce((acc, curr) => acc + curr, 0);
}
