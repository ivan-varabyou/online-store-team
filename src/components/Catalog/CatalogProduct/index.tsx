import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IResultProduct } from '../../../models';

import { CartContext } from '../../../App';

import styles from './CatalogProduct.module.scss';

interface IProductProp {
  product: IResultProduct;
}

export const CatalogProduct = ({ product }: IProductProp) => {
  const {
    addProductsCart,
    removeProductCart,
    isAddCart,
    updateCartCountAndSumm,
  } = useContext(CartContext);

  const dafaultStatusAddToCart =
    isAddCart && product.id && isAddCart(product.id);
  const [statusAddToCart, setStatusAddToCart] = useState(
    dafaultStatusAddToCart,
  );

  const buttonAddToCartText = statusAddToCart ? 'Remove' : 'Add to cart';

  const handleButtonCart = (): void => {
    if (statusAddToCart) {
      product.id && removeProductCart && removeProductCart(product.id, 1);
      setStatusAddToCart(false);
    } else {
      product && addProductsCart && addProductsCart(product, 1);
      setStatusAddToCart(true);
    }
    updateCartCountAndSumm && updateCartCountAndSumm();
  };

  return (
    <>
      <div className={styles.product + ' card-product'}>
        <div className={styles.product__card + ' product__grid'}>
          <div className={styles.product__image + ' product__image'}>
            <Link
              className={styles.product__wrapper + ' product__wrapper'}
              to={'/product/' + product.id}
              style={{ backgroundImage: `url(${product.thumbnail})` }}></Link>
            <div
              className={`${styles.product__label} ${styles.product__sales}`}>
              {product.discountPercentage}%
            </div>
            <div
              className={`${styles.product__label} ${styles.product__brand}`}>
              {product.brand}
            </div>
          </div>
          <div className={styles.product__detail + ' product__detail'}>
            <div className={styles.product__price}>
              {product.discountPercentage && (
                <del className={styles.product__priceold}>
                  $
                  {Math.ceil(
                    product.price +
                      (product.price / 100) * product.discountPercentage,
                  )}
                </del>
              )}
              <strong>${product.price}</strong>
            </div>
            <Link
              to={'/product/' + product.id}
              className={styles.product__title + ' product__title'}>
              {String(product.title).slice(0, 30)}
            </Link>

            <p className={styles.product__stock + ' product__stock'}>
              <strong>Stock:</strong> {product.stock}
            </p>

            <p
              className={styles.product__description + ' product__description'}>
              {product.description}
            </p>

            <div className={styles.product__button}>
              <button className='btn btn-primary' onClick={handleButtonCart}>
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