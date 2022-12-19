import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

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

  return (
    <>
      <header className='header section-header border-bottom'>
        <div className='container'>
          <div className={styles.row}>
            <Link className={styles.logo} to='/'>
              <i className='bi bi-lightning-charge-fill'></i> RSSHOP
            </Link>
            <nav className={styles.nav}>
              <ul className='navbar-nav me-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>
                    Catalog
                  </Link>
                </li>
              </ul>
            </nav>

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
