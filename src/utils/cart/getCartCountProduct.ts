import { TypeCartItem } from '../../models';
import { getLocalStorage } from '../localStorage';

export function getCartCountProduct(id: number): number | undefined {
  return getLocalStorage<TypeCartItem>('cart')
    .filter((product) => product.id === id)
    .map((product) => product.count)[0];
}
