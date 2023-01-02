import { getLocalStorage, setLocalStorage } from '../localStorage';
import { TypeCartItem } from '../../models';

import { difference } from '../common/calc/difference';

export function removeProductCart(id: number, count: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage<TypeCartItem>('cart');
  const newItems: Array<TypeCartItem> = [];
  cartItems.forEach((item: TypeCartItem) => {
    if (item.id === id) {
      if (item.count > 1 && difference(item.count, count) > 0) {
        item.count = difference(item.count, count);
        newItems.push(item);
      }
    } else {
      newItems.push(item);
    }
  });
  setLocalStorage('cart', newItems);
  return true;
}
