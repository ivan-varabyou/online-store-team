import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/empty-cart.png';
import styles from '../CartEmpty/CartEmpty.module.scss';

export function CartEmpty() {
  return (
    <div className='container'>
      <div className={styles.cartEmpty}>
        <div>
          <h2>
            Корзина пустая <span>😕</span>
          </h2>
          <p>Вероятней всего, вы ничего не заказали</p>
          <img className={styles.cartEmptyImage} src={cartEmptyImg} alt='Empty cart' />
        </div>
        <Link to='/' className='button button--black'>
          <button type='button' className='btn btn-secondary'>
            back
          </button>
        </Link>
      </div>
    </div>
  );
}
