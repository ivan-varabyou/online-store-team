import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/ProductPage';
import { CatalogPage } from './pages/CatalogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardPage } from './pages/CartPage';

import { Header } from './components/Header';

interface ISearchContext {
  searchValue?: string;
  setSerachValue?: React.Dispatch<string>;
}

export const SearchContext = createContext<Partial<ISearchContext>>({});

function App() {
  const [searchValue, setSerachValue] = useState('');
  return (
    <>
      <SearchContext.Provider value={{ searchValue, setSerachValue }}>
        <Header />
        <Routes>
          <Route path='/' element={<CatalogPage />}></Route>
          <Route path='/cart' element={<CardPage />}></Route>
          <Route path='/product/:productId' element={<ProductPage />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
