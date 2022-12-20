import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../models';

import styles from './CardProductGrid.module.scss';

interface IProductProp {
  product: IProduct;
}

export const CardProductGrid = ({ product }: IProductProp) => {
  return (
    <>
      <div className={styles.product}>
        <figure className={styles.product__card}>
          <Link
            className={styles.product__wrapper}
            to={'/product/' + product.id}
            style={{ backgroundImage: `url(${product.thumbnail})` }}></Link>
          <div className={styles.product__price}>
            <strong>${product.price}</strong>
            {/* <del className='price-old'>$170.00</del> */}
          </div>
          <Link to={'/product/' + product.id} className={styles.product__title}>
            {product.title}
          </Link>
          <p className={styles.product__description}>
            {product.description?.slice(0, 70) + '...'}
          </p>

          <div className={styles.product__button}>
            <button className='btn btn-primary'>Add to cart</button>
            <Link
              to={'/product/' + product.id}
              className='btn btn-light btn-icon'>
              More
              <i className='fa fa-heart'></i>
            </Link>
          </div>
        </figure>
      </div>
    </>
  );
};
