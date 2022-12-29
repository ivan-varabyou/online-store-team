import { getLocalStorage, setLocalStorage } from '../localStorage';
import { IResultProduct, TypeCartItem } from '../../models';
import { isAddCart } from './isAddCart';

export function addProductsCart(
  product: IResultProduct | TypeCartItem,
  count: number,
): boolean {
  const cartItems: Array<TypeCartItem> = getLocalStorage('cart');

  if (isAddCart(product.id)) {
    cartItems.map((item) => {
      if (item.id === product.id && item.count > 0) {
        item.count += count;
      }
      return item;
    });
  } else {
    const cartItem: TypeCartItem = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      thumbnail: product.thumbnail,
      images: product.images,
      count: count,
    };
    cartItems.push(cartItem);
  }

  setLocalStorage('cart', cartItems);
  return true;
}
