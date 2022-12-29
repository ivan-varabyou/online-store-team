import { getLocalStorage } from '../localStorage';

export function getCartCountProduct(id: number): number | undefined {
  return getLocalStorage('cart')
    .filter((product) => product.id === id)
    .map((product) => product.count)[0];
}
