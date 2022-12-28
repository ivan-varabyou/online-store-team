import { getLocalStorage } from '../localStorage';
import { TypeCartItem } from '../../models';

export function isAddCart(id: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) return true;
  }
  return false;
}
