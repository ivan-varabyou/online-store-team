import React, { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import { IPromocode } from '../models';
import { clear, log } from 'console';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { CartProduct } from '../components/Cart/CartProduct';
import { CartPromocode } from '../components/Cart/CartPromocode';

import styles from '../scss/page/CartPage.module.scss';

export function CardPage() {
  const addProductsCart = useContext(CartContext).addProductsCart;
  const removeProductCart = useContext(CartContext).removeProductCart;
  const isAddCart = useContext(CartContext).isAddCart;
  const getCartCountProduct = useContext(CartContext).getCartCountProduct;
  const getCartCount = useContext(CartContext).getCartCount;
  const getCartTotal = useContext(CartContext).getCartTotal;
  const getLocalStorage = useContext(CartContext).getLocalStorage;
  const updateCartCountAndSumm = useContext(CartContext).updateCartCountAndSumm;
  const getCartDiscountTotal = useContext(CartContext).getCartDiscountTotal;
  const handleModalStatus = useContext(CartContext).handleModalStatus;

  const [productsCart, setProductsCart] = useState(
    getLocalStorage && getLocalStorage('cart'),
  );

  const listPromocode: IPromocode[] = [
    { name: '2023', discount: 10 },
    { name: 'rsshool', discount: 50 },
  ];

  const [promo, setPromo] = useState<IPromocode | null>(null);

  const promocodeInput = useRef<HTMLInputElement | null>(null);

  let cartTotal, cartCountTotal, cartDiscount, cartSumm;

  if (getCartTotal) cartTotal = getCartTotal();
  if (getCartCount) cartCountTotal = getCartCount();
  if (getCartDiscountTotal && cartTotal)
    cartDiscount = getCartDiscountTotal() - cartTotal;
  if (cartTotal && cartDiscount) cartSumm = cartTotal + cartDiscount;

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
                Items {cartCountTotal}
                <span className={styles.cart__page}> | Page 1</span>
              </p>
            </div>
          </section>
          <div className='container  mb-4'>
            <div className='row mt-4'>
              <div className='col-md-9'>
                {productsCart &&
                  productsCart.map((product) => (
                    <CartProduct
                      product={product}
                      key={product.id}
                      setProductsCart={setProductsCart}
                    />
                  ))}
              </div>

              <div className='col-md-3'>
                <div className='card'>
                  <div className='card-body'>
                    <h4 className='card-title'>Summary</h4>
                    <div className={styles.cart__summary}>
                      <div className={styles.cart__summaryRow}>
                        <strong>Regular amount:</strong>
                        <div>${cartSumm}</div>
                      </div>

                      <div className={styles.cart__summaryRow}>
                        <strong>Discount shop:</strong>
                        <div>${cartDiscount}</div>
                      </div>

                      {promo && (
                        <div
                          className={
                            styles.cart__summaryRow +
                            ' ' +
                            styles.cart__summaryRowPromo
                          }>
                          <strong>
                            Promocode: ({promo.name}: -{promo.discount}%)
                          </strong>
                          <div>100000</div>
                        </div>
                      )}

                      <div className={styles.cart__summaryRow}>
                        <strong>Total amount:</strong>
                        <div>${cartTotal}</div>
                      </div>

                      <div className={styles.cart__summaryRow}>
                        <strong>Total count:</strong>
                        <div>{cartCountTotal}</div>
                      </div>
                    </div>

                    <div className='input-group mt-3'>
                      <input
                        ref={promocodeInput}
                        type='text'
                        className='form-control'
                        placeholder='Promo code'
                        name='promoCode'
                      />

                      <button className='btn btn-primary text-white'>
                        Apply
                      </button>
                    </div>
                    <div className={styles.cart__coupon}>
                      {!promo &&
                        listPromocode.map((promocode, index) => (
                          <CartPromocode
                            promocode={promocode}
                            setPromo={setPromo}
                            index={index}
                            key={index}
                          />
                        ))}

                      {promo && (
                        <CartPromocode
                          promocode={promo}
                          setPromo={setPromo}></CartPromocode>
                      )}
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
