import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';

import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

import { useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = (cartCount: { cartCount: number }): JSX.Element => {
  const [search] = useSearchParams();
  const [value, setValue] = useState(search.get('search') || '');

  const setSearchValue = useContext(SearchContext).setSerachValue;

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
    }, 1000),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
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
