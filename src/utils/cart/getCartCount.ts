import { getLocalStorage } from '../localStorage';
import { TypeCartItem } from '../../models';

export function getCartCount(): number {
  return getLocalStorage<TypeCartItem>('cart')
    .map((product) => product.count)
    .reduce((acc, curr) => acc + curr, 0);
}
