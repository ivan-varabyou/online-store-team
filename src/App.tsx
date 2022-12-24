import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ISearchContext, ICartContext } from './models';

import { getLocalStorage, setLocalStorage } from './hooks/storage';

import {
  getCartCount,
  getCartTotal,
  addProductsCart,
  removeProductCart,
  isAddCart,
} from './hooks/cart';

import redirectingNonExistentPages from './hooks/redirecting';

export const SearchContext = createContext<Partial<ISearchContext>>({});
export const CartContext = createContext<Partial<ICartContext>>({});

function App() {
  const [searchUrl] = useSearchParams();
  redirectingNonExistentPages(searchUrl);

  const [cartCount, setCartCount] = useState(getCartCount() || 0);
  const [cartTotal, setCartTotal] = useState(getCartTotal() || 0);

  useEffect(() => {
    if (!getLocalStorage('cart')) {
      setLocalStorage<[]>('cart', []);
    }
  }, []);

  const [searchValue, setSerachValue] = useState('');
  // const [currentProductCart, addProductsCart] = useState(null);

  function updateCartCountAndSumm() {
    setCartTotal(getCartTotal());
    setCartCount(getCartCount());
  }

  const [modalStatus, setModalStatus] = useState(false);
  const handleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

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
            getCartCount,
            addProductsCart,
            removeProductCart,
            isAddCart,
            cartCount,
            cartTotal,
            updateCartCountAndSumm,
            handleModalStatus,
          }}>
          <Header />
          <Routes>
            <Route path='/' element={<CatalogPage />}></Route>
            <Route path='/cart' element={<CardPage />}></Route>
            <Route path='/product/:productId' element={<ProductPage />}></Route>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
          <Modal status={{ modalStatus, setModalStatus }} />
          <Footer />
        </CartContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
