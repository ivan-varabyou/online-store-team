import { TypeCartItem } from '../../models';
import { getLocalStorage } from '../localStorage';

export function getCartTotal(): number {
  if (getLocalStorage<TypeCartItem>('cart').length > 0) {
    const products = getLocalStorage<TypeCartItem>('cart');
    return products
      .map((product) => product.price * product.count)
      .reduce((acc, cur) => acc + cur);
  }
  return 0;
}
