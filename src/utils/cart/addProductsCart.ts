import { getLocalStorage, setLocalStorage } from '../localStorage';
import { IResultProduct, TypeCartItem } from '../../models';
import { isAddCart } from './isAddCart';

export function addProductsCart(
  currentProductCart: IResultProduct,
  count: number,
): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');

  if (isAddCart(currentProductCart.id)) {
    cartItems.map((item) => {
      if (item.id === currentProductCart.id && item.count > 0) {
        item.count += count;
      }
      return item;
    });
  } else {
    const cartItem: TypeCartItem = {
      id: currentProductCart.id,
      title: currentProductCart.title,
      price: currentProductCart.price,
      discountPercentage: currentProductCart.discountPercentage,
      thumbnail: currentProductCart.thumbnail,
      count: count,
    };
    cartItems.push(cartItem);
  }

  setLocalStorage('cart', cartItems);
  return true;
}
