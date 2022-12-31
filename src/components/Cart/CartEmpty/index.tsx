import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../../assets/img/empty-cart.png';
import styles from './CartEmpty.module.scss';

export function CartEmpty() {
  React.useState();
  return (
    <div className='container'>
      <div className='row mt-4 mb-4'>
        <div className={styles.cartEmpty}>
          <div>
            <h2>
              Корзина пустая <span>😕</span>
            </h2>
            <p>Вероятней всего, вы ничего не заказали</p>
            <img
              className={styles.cartEmptyImage}
              src={cartEmptyImg}
              alt='Empty cart'
            />
          </div>
          <Link to='/' className='btn btn-primary btn-lg'>
            Go Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
