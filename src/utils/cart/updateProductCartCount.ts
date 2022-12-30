import { getLocalStorage, setLocalStorage } from '../localStorage';
import { TypeCartItem } from '../../models';

export function updateProductCartCount(id: number, count: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage<TypeCartItem>('cart');
  let status = false;

  cartItems.map((product) => {
    if (product.id === id) {
      product.count = count;
      status = true;
    }
    return product;
  });

  setLocalStorage('cart', cartItems);
  return status;
}
