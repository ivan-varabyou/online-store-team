import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

import { Header } from './components/Header';
import { ISearchContext, ICartContext } from './models';

import { getLocalStorage, setLocalStorage } from './hooks/storage';

import {
  getCartTotal,
  addProductsCart,
  removeProductCart,
  isAddCart,
} from './hooks/cart';

export const SearchContext = createContext<Partial<ISearchContext>>({});
export const CartContext = createContext<Partial<ICartContext>>({});

function App() {
  const [cartCount, setCartCount] = useState(
    Number(getLocalStorage('cart').length || 0),
  );
  const [cartTotal, setCartTotal] = useState(Number(getCartTotal() || 0));

  useEffect(() => {
    if (!getLocalStorage('cart')) {
      setLocalStorage<[]>('cart', []);
    }
  }, []);

  const [searchValue, setSerachValue] = useState('');
  // const [currentProductCart, addProductsCart] = useState(null);

  function updateCartCountAndSumm() {
    setCartTotal(getCartTotal());
    setCartCount(getLocalStorage('cart').length);
  }

  return (
    <>
      <SearchContext.Provider
        value={{
          searchValue,
          setSerachValue,
        }}>
        <CartContext.Provider
          value={{
            getLocalStorage,
            setLocalStorage,
            getCartTotal,
            addProductsCart,
            removeProductCart,
            isAddCart,
            cartCount,
            cartTotal,
            updateCartCountAndSumm,
          }}>
          <Header />
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
