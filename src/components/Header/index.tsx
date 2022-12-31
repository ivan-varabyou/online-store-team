import React, { useState, useContext, useRef, useCallback } from 'react';

import { Link } from 'react-router-dom';

import debounce from 'lodash.debounce';

import { CartContext } from '../../App';

import { useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  const cartCount = Number(useContext(CartContext).cartCount);
  const cartTotal = Number(useContext(CartContext).cartTotal);

  const [search] = useSearchParams();
  const [value, setValue] = useState(search.get('search') || '');

  const [searchUrl, setSearchValue] = useSearchParams();
  searchUrl && searchUrl;

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearchValue && setSearchValue('');
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue && setSearchValue(value);
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const isCatalog = window.location.pathname === '/';

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

            {isCatalog && (
              <div className={styles.search}>
                <input
                  ref={inputRef}
                  onClick={onClickClear}
                  onInput={onChangeInput}
                  type='search'
                  className='form-control'
                  placeholder='Search'
                  value={value}
                />
              </div>
            )}

            <div className={styles.widget}>
              <div className={styles.widget_item}>
                <Link to='/cart' className={styles.widget_link}>
                  <i className='bi bi-cart-fill'></i>

                  {cartCount > 0 && (
                    <span className={styles.notify}>{cartCount}</span>
                  )}

                  {cartTotal > 0 && (
                    <span className={styles.total}>{'$' + cartTotal}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
