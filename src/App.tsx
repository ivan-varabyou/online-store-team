import React, { createContext, useState, useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ISearchContext, ICartContext } from './models';

import { getLocalStorage, setLocalStorage } from './utils/localStorage';

import { getCartCount } from './utils/cart/getCartCount';
import { getCartTotal } from './utils/cart/getCartTotal';
import { addProductsCart } from './utils/cart/addProductsCart';
import { removeProductCart } from './utils/cart/removeProductCart';
import { updateProductCartCount } from './utils/cart/updateProductCartCount';
import { isAddCart } from './utils/cart/isAddCart';
import { getCartDiscountTotal } from './utils/cart/getCartDiscountTotal';
import { getCartCountProduct } from './utils/cart/getCartCountProduct';
import { getCartCountLimit } from './utils/cart/getCartCountLimit';

export const SearchContext = createContext<Partial<ISearchContext>>({});
export const CartContext = createContext<Partial<ICartContext>>({});

function App() {

  const [search] = useSearchParams();
  const [searchValueInput, setSearchValueInput] = useState(search.get('search') || '');

  const [cartCount, setCartCount] = useState(getCartCount() || 0);
  const [cartTotal, setCartTotal] = useState(getCartTotal() || 0);

  useEffect(() => {
    if (!getLocalStorage('cart')) {
      setLocalStorage<[]>('cart', []);
    }
  }, []);

  const [searchValue, setSerachValue] = useState('');

  function updateCartCountAndSumm() {
    setCartTotal(getCartTotal());
    setCartCount(getCartCount());
  }


  return (
    <>
      <SearchContext.Provider
        value={{
          searchValue,
          setSerachValue,
          searchValueInput,
          setSearchValueInput,
        }}>
        <CartContext.Provider
          value={{

            getLocalStorage,
            setLocalStorage,
            getCartTotal,
            getCartCount,
            getCartDiscountTotal,
            addProductsCart,
            removeProductCart,
            updateProductCartCount,
            isAddCart,
            getCartCountProduct,
            getCartCountLimit,
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

          <Footer />
        </CartContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
