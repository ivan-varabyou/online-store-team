import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../models';

import styles from './ProductCardGrid.module.scss';

interface IProductProp {
  product: IProduct;
}

export const ProductCardGrid = ({ product }: IProductProp) => {
  const [statusAddToCart, setStatusAddToCart] = useState(false);
  const buttonAddToCartText = statusAddToCart ? 'Remove' : 'Add to cart';

  return (
    <>
      <div className={styles.product + ' card-product'}>
        <div className={styles.product__card + ' product__grid'}>
          <div className='product__image'>
            <Link
              className={styles.product__wrapper}
              to={'/product/' + product.id}
              style={{ backgroundImage: `url(${product.thumbnail})` }}></Link>
          </div>
          <div className='product__detail'>
            <div className={styles.product__price}>
              <strong>${product.price}</strong>
              {/* <del className='price-old'>$170.00</del> */}
            </div>
            <Link
              to={'/product/' + product.id}
              className={styles.product__title + ' product__title'}>
              {product.title}
            </Link>

            <p
              className={styles.product__description + ' product__description'}>
              {product.description?.slice(0, 25) + '...'}
            </p>

            <div className={styles.product__button}>
              <button
                className='btn btn-primary'
                onClick={() => {
                  setStatusAddToCart(!statusAddToCart);
                }}>
                {buttonAddToCartText}
              </button>
              <Link
                to={'/product/' + product.id}
                className='btn btn-light btn-icon'>
                More
                <i className='fa fa-heart'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
