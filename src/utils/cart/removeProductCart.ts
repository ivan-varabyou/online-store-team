import { getLocalStorage, setLocalStorage } from '../localStorage';
import { TypeCartItem } from '../../models';

export function removeProductCart(id: number, count: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');
  const newItems: Array<TypeCartItem> = [];
  cartItems.forEach((item: TypeCartItem) => {
    if (item.count - count > 0) {
      if (item.id === id) {
        if (item.count > 1) {
          item.count -= count;
          newItems.push(item);
        }
      } else {
        newItems.push(item);
      }
    }
  });
  setLocalStorage('cart', newItems);
  return true;
}
