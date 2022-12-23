import { getLocalStorage, setLocalStorage } from './storage';
import { IResultProduct, TypeCartItem } from '../models';

export function getCartTotal(): number {
  if (getLocalStorage('cart').length > 0) {
    const products = getLocalStorage('cart');
    return products
      .map((product) => product.price)
      .reduce((acc, cur) => acc + cur);
  }
  return 0;
}

export function getCartCount(): number {
  return getLocalStorage('cart').length;
}

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
  // setCartCount(Number(cartItems.length));
  // setCartTotal(getCartTotal());
  return true;
}

export function removeProductCart(id: number, count: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');
  const newItems: Array<TypeCartItem> = [];
  cartItems.forEach((item: TypeCartItem) => {
    if (item.id === id) {
      if (item.count > 1) {
        item.count -= count;
        newItems.push(item);
      }
    } else {
      newItems.push(item);
    }
  });
  setLocalStorage('cart', newItems);
  // setCartCount(Number(newItems.length));
  // setCartTotal(getCartTotal());
  return true;
}

export function isAddCart(id: number): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) return true;
  }
  return false;
}
