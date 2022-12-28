import { getLocalStorage } from '../localStorage';

export function getCartCount(): number {
  return getLocalStorage('cart').length;
}
