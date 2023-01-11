import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { CartContext } from '../../App';

import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  const cartCount = Number(useContext(CartContext).cartCount);
  const cartTotal = Number(useContext(CartContext).cartTotal);
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
