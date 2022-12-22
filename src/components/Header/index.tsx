import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';

import styles from './Header.module.scss';

function getLocalStorage(value: string): [] {
  let parse = [];
  const valueLocalStorage = localStorage.getItem(value);
  if (valueLocalStorage === 'string') {
    parse = JSON.parse(valueLocalStorage);
  }
  return parse;
}

export const Header = () => {
  const [countCart, setCountCart] = useState(0);
  7;

  useEffect(() => {
    if (getLocalStorage('cart').length === 0) {
      setCountCart(getLocalStorage('cart').length);
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);

  const cartProducts = getLocalStorage('cart');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts)), [cartProducts];
  });

  const searchValue = useContext(SearchContext).searchValue;
  const setSerachValue = useContext(SearchContext).setSerachValue;

  const handleChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    if (setSerachValue !== undefined) {
      setSerachValue(event.target.value);
    }
  };

  return (
    <>
      <header className='header section-header border-bottom'>
        <div className='container'>
          <div className={styles.row}>
            <div className={styles.logoblock}>
              <Link className={styles.logo} to='/'>
                <i className='bi bi-lightning-charge-fill'></i> RSSHOP
              </Link>
            </div>

            <div className={styles.search}>
              <div className='input-group'>
                <input
                  value={searchValue}
                  onInput={handleChangeSearch}
                  type='search'
                  className='form-control'
                  placeholder='Search'
                />

                <button className='btn btn-primary'>
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </div>

            <div className={styles.widget}>
              <div className={styles.widget_item}>
                <Link to='/cart' className={styles.widget_link}>
                  <i className='bi bi-cart-fill'></i>
                  <span className={styles.notify}>{countCart}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
