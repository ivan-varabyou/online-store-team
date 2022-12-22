import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

import { Header } from './components/Header';
import { IResultProduct } from './models';

interface ISearchContext {
  searchValue?: string;
  setSerachValue?: React.Dispatch<string>;
}

interface ICartContext {
  addProductsCart: (data: IResultProduct, count: number) => boolean;
  removeProductCart: (id: number, count: number) => boolean;
  isAddCart: (id: number) => boolean;
}

interface ICartItem {
  id: number;
  count: number;
  data: IResultProduct | null;
}

export function getLocalStorage(value: string): Array<ICartItem> | [] {
  let parse = [];
  const valueLocalStorage = localStorage.getItem(value);
  if (valueLocalStorage) {
    parse = JSON.parse(valueLocalStorage);
  }
  return parse;
}

export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const SearchContext = createContext<Partial<ISearchContext>>({});
export const CartContext = createContext<Partial<ICartContext>>({});

function App() {
  useEffect(() => {
    if (!getLocalStorage('cart')) {
      setLocalStorage<[]>('cart', []);
    }
  }, []);

  const [searchValue, setSerachValue] = useState('');
  // const [currentProductCart, addProductsCart] = useState(null);
  const [cartCount, setCartCount] = useState(getLocalStorage('cart').length);

  function addProductsCart(
    currentProductCart: IResultProduct,
    count: number,
  ): boolean {
    const cartItems: Array<ICartItem> = getLocalStorage('cart');

    if (isAddCart(currentProductCart.id)) {
      cartItems.map((item) => {
        if (item.id === currentProductCart.id && item.count > 0) {
          item.count += count;
        }
        return item;
      });
    } else {
      const cartItem: ICartItem = {
        id: currentProductCart.id,
        count: count,
        data: currentProductCart,
      };
      cartItems.push(cartItem);
    }

    setLocalStorage('cart', cartItems);
    setCartCount(cartItems.length);
    return true;
  }

  function removeProductCart(id: number, count: number): boolean {
    const cartItems: Array<ICartItem> = getLocalStorage('cart');
    const newItems: Array<ICartItem> = [];
    cartItems.forEach((item: ICartItem) => {
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
    setCartCount(newItems.length);
    return true;
  }

  function isAddCart(id: number): boolean {
    const cartItems: Array<ICartItem> = getLocalStorage('cart');
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === id) return true;
    }
    return false;
  }

  // useEffect(() => {
  //   let cartItems: Array<IResultProduct> | [] = getLocalStorage('cart');

  //   let pushProductStatus = true;
  //   if (currentProductCart !== null) {
  //     cartItems = cartItems.map((product) =>{
  //       console.log(product)
  //       return product.id === currentProductCart.id && product.count += 1 && pushProductStatus = false
  //     }

  //     )
  //   } else if(pushProductStatus) {
  //     cartItems.push(currentProductCart);
  //   }
  //   setCartCount(cartItems.length);
  //   setLocalStorage<Array<IResultProduct>>('cart', cartItems);
  // }, [currentProductCart]);

  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSerachValue }}>
        <CartContext.Provider
          value={{ addProductsCart, removeProductCart, isAddCart }}>
          <Header cartCount={Number(cartCount)} />
          <Routes>
            <Route path='/' element={<CatalogPage />}></Route>
            <Route path='/cart' element={<CardPage />}></Route>
            <Route path='/product/:productId' element={<ProductPage />}></Route>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
        </CartContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
