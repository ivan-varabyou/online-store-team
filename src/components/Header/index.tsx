import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';

import styles from './Header.module.scss';

export const Header = (cartCount: { cartCount: number }): JSX.Element => {
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
                  <span className={styles.notify}>
                    {cartCount.cartCount || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
