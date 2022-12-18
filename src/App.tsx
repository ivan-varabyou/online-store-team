import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<CatalogPage />}></Route>
        <Route path='/cart' element={<CardPage />}></Route>
        <Route path='/product/:productId' element={<ProductPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
