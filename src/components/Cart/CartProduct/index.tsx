import React, { useContext, useRef } from 'react';
import { TypeCartItem } from '../../../models';
import styles from './CartProduct.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../App';

import { getProductOldPrice } from '../../../utils/product/getProductOldPrice';
import { getStarsRatting } from '../../../utils/product/getStarsRatting';

export const CartProduct = ({
  product,
  setProductsCart,
  index,
  page,
  limit,
}: {
  product: TypeCartItem;
  setProductsCart: (products: [] | TypeCartItem[]) => void;
  index: number;
  page: number;
  limit: number;
}) => {
  const {
    removeProductCart,
    updateProductCartCount,
    updateCartCountAndSumm,
    addProductsCart,
    getLocalStorage,
    getCartCountLimit,
  } = useContext(CartContext);

  const productCatd = useRef<null | HTMLDivElement>(null);

  const addButton = useRef<HTMLButtonElement>(null);

  const productOldPrice = getProductOldPrice(
    product.price,
    product.discountPercentage,
  );

  const hendleDropFromCart = (count: number) => {
    removeProductCart && removeProductCart(product.id, count);

    if (getLocalStorage) setProductsCart(getLocalStorage('cart'));
    updateCartCountAndSumm && updateCartCountAndSumm();
  };

  const hendleAddToCart = (count: number) => {
    addProductsCart && addProductsCart(product, count);
    if (getLocalStorage) setProductsCart(getLocalStorage('cart'));
    updateCartCountAndSumm && updateCartCountAndSumm();
  };

  const hendleChangeCart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = getCartCountLimit && getCartCountLimit(+e.target.value);
    count &&
      updateProductCartCount &&
      updateProductCartCount(product.id, count);
    if (getLocalStorage) setProductsCart(getLocalStorage('cart'));
    updateCartCountAndSumm && updateCartCountAndSumm();
  };
  let startIndex;
  if (page === 1) {
    startIndex = 0;
  } else {
    startIndex = limit * page - limit;
  }

  return (
    <>
      <div className='card card-body mb-1' ref={productCatd}>
        <div className='row gy-3'>
          <div className='row mt-4'>
            <div className='col-lg-2'>
              <div className={`${styles.cart__label}`}>
                {index + 1 + startIndex}
              </div>
              <Link to={'/product/' + product.id}>
                <img src={product.thumbnail} className='img-thumbnail' />
              </Link>
            </div>

            <div className='col-lg-6'>
              <Link to={'/product/' + product.id}>
                <h6 className='title'>
                  {product.title} | {product.brand}
                </h6>
              </Link>
              <div>
                <div>{product.category}</div>
                <div>{product.description}</div>
              </div>
              <div className={styles.productPage__stars + ' mb-2'}>
                {getStarsRatting(product.rating).map((star, index) => (
                  <span className={star} key={index}></span>
                ))}
              </div>
              <div>
                <strong className='text-red'>${product.price} </strong>
                <del>{productOldPrice}</del> (-{product.discountPercentage}%) x{' '}
                {product.count}
              </div>
            </div>

            <div className='col-lg-3'>
              <div className={styles.cart__spiner + ' input-group'}>
                <button
                  className={styles.cart__spinerButton + ' btn bg-light'}
                  type='button'
                  onClick={() => hendleDropFromCart(1)}>
                  <i className='bi bi-dash'></i>
                </button>
                <input
                  disabled
                  type='number'
                  min='1'
                  max={product.stock}
                  className={
                    styles.cart__productCount + ' form-control text-center'
                  }
                  value={product.count}
                  onChange={hendleChangeCart}
                />
                <button
                  ref={addButton}
                  className={styles.cart__spinerButton + ' btn bg-light'}
                  type='button'
                  onClick={() => hendleAddToCart(1)}>
                  <i className='bi bi-plus'></i>
                </button>
              </div>
              <div className='row mt-2'>
                <div className='text-center'>In Stock: {product.stock}</div>
              </div>
            </div>

            <div className='col-lg-1'>
              <button
                className='btn btn-icon btn-danger'
                onClick={() => hendleDropFromCart(product.count)}>
                <i className='bi bi-trash'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
