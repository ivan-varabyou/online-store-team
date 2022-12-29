import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import { IResultProduct } from '../models';
import { clear, log } from 'console';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { CartProduct } from '../components/Cart/CartProduct';
import styles from '../scss/page/CartPage.module.scss';

export function CardPage() {
  const addProductsCart = useContext(CartContext).addProductsCart;
  const removeProductCart = useContext(CartContext).removeProductCart;
  const isAddCart = useContext(CartContext).isAddCart;
  const getCartCount = useContext(CartContext).getCartCount;
  const getCartTotal = useContext(CartContext).getCartTotal;
  const getLocalStorage = useContext(CartContext).getLocalStorage;
  const updateCartCountAndSumm = useContext(CartContext).updateCartCountAndSumm;
  const getCartDiscountTotal = useContext(CartContext).getCartDiscountTotal;
  const handleModalStatus = useContext(CartContext).handleModalStatus;

  const productsCart = getLocalStorage && getLocalStorage('cart');

  const cartTotal = getCartTotal && getCartTotal();
  const cartDiscount = getCartDiscountTotal && getCartDiscountTotal();
  const cartSumm = cartTotal && cartDiscount && cartTotal + cartDiscount;

  if (productsCart?.length == 0) {
    return (
      <div>
        <CartEmpty />
      </div>
    );
  } else {
    return (
      <>
        <main className={styles.cart}>
          <section className='bg-primary py-4'>
            <div className='container'>
              <h1 className={styles.cart__title}>Products In Cart </h1>
              <p className={styles.cart__items}>
                Items {productsCart?.length}
                <span className={styles.cart__page}> | Page 1</span>
              </p>
            </div>
          </section>
          <div className='container'>
            <div className='row mt-4'>
              <div className='col-md-9'>
                {productsCart &&
                  productsCart.map((product) => (
                    <CartProduct product={product} key={product.id} />
                  ))}
              </div>

              <div className='col-md-3'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='input-group mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Promo code'
                        name='promoCode'
                      />
                      <button className='btn btn-primary text-white'>
                        Apply
                      </button>
                    </div>
                    <h5 className='card-title'>Summary</h5>

                    <div className='row'>
                      <strong className='col-lg-6'>Total price:</strong>
                      <div className='col-lg-6'>${cartSumm}</div>
                    </div>

                    <div className='row'>
                      <strong className='col-lg-6'>Discount:</strong>
                      <div className='col-lg-6'>${cartDiscount}</div>
                    </div>

                    <div className='row'>
                      <strong className='col-lg-6'>Total:</strong>
                      <div className='col-lg-6'>${cartTotal}</div>
                    </div>

                    <button
                      onClick={handleModalStatus}
                      className='btn btn-success mb-2 mt-4 w-100'>
                      PAY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
