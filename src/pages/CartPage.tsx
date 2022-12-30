import React, { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '../App';
import { Link, useSearchParams } from 'react-router-dom';
import { IPromocode, TypeCartItem } from '../models';
import { clear, log } from 'console';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { CartProduct } from '../components/Cart/CartProduct';
import { CartPromocode } from '../components/Cart/CartPromocode';

import styles from '../scss/page/CartPage.module.scss';
import { ChangeEvent } from 'react';
import { filter } from 'lodash';

export function CardPage() {
  // const addProductsCart = useContext(CartContext).addProductsCart;
  // const removeProductCart = useContext(CartContext).removeProductCart;
  // const isAddCart = useContext(CartContext).isAddCart;
  // const getCartCountProduct = useContext(CartContext).getCartCountProduct;
  const getCartCount = useContext(CartContext).getCartCount;
  const getCartTotal = useContext(CartContext).getCartTotal;
  const getLocalStorage = useContext(CartContext).getLocalStorage;
  // const setLocalStorage = useContext(CartContext).setLocalStorage;
  // const updateCartCountAndSumm = useContext(CartContext).updateCartCountAndSumm;
  const getCartDiscountTotal = useContext(CartContext).getCartDiscountTotal;
  const handleModalStatus = useContext(CartContext).handleModalStatus;
  const modalStatus = useContext(CartContext).modalStatus;

  const openModal = () => {
    handleModalStatus && handleModalStatus(true);
  };

  const [url, setUrl] = useSearchParams();

  useEffect(() => {
    if (url.get('modal') === 'buy' && !modalStatus) {
      openModal();
      setUrl({});
    }
  }, []);

  const [productsCart, setProductsCart] = useState(
    getLocalStorage && getLocalStorage<TypeCartItem>('cart'),
  );

  const [listPromocode, setListPromocode] = useState<IPromocode[]>([
    { name: '2023', discount: 10, status: false, input: false },
    { name: 'rsshool', discount: 50, status: false, input: false },
  ]);

  const getPromocodeActive = () => {
    return listPromocode.filter((item) => item.status);
  };

  const getPromocodeActiveSummDiscount = () => {
    if (getPromocodeActive().length > 0) {
      return getPromocodeActive()
        .map((promocode) => promocode.discount)
        .reduce((acc, curr) => acc + curr, 0);
    }
    return 0;
  };

  const isPromocodeActive = (promocodeName: string) => {
    return listPromocode
      .filter((promocode) => promocode.name === promocodeName)
      .map((promocode) => promocode.name)[0];
  };

  const setPromocodeStatus = (
    promocodeIndex: number,
    status: boolean,
  ): void => {
    const newListPromocode = [...listPromocode];
    newListPromocode[promocodeIndex].status = status;
    setListPromocode(newListPromocode);
  };

  let cartTotal, oldCartTotal, cartCountTotal, cartDiscount, cartSumm;

  if (getCartTotal) cartTotal = +getCartTotal().toString();
  if (cartTotal) oldCartTotal = cartTotal;

  if (getCartCount) cartCountTotal = getCartCount();
  if (getCartDiscountTotal && cartTotal)
    cartDiscount = getCartDiscountTotal() - cartTotal;
  if (cartTotal && cartDiscount) cartSumm = cartTotal + cartDiscount;

  if (getPromocodeActiveSummDiscount() > 0 && cartTotal) {
    const discount = getPromocodeActiveSummDiscount();
    cartTotal = (cartTotal / 100) * (100 - discount);
  }

  const handleChangePromocode = (e: ChangeEvent<HTMLInputElement>) => {
    const result = isPromocodeActive(e.target.value);
    const newListPromocode = [...listPromocode];
    for (let i = 0; i < newListPromocode.length; i++) {
      if (newListPromocode[i].name === result) {
        newListPromocode[i].input = true;
      } else {
        newListPromocode[i].input = false;
      }
    }
    setListPromocode(newListPromocode);
  };

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
              <div className='col-md-8'>
                {productsCart &&
                  productsCart.map((product) => (
                    <CartProduct
                      product={product}
                      key={product.id}
                      setProductsCart={setProductsCart}
                    />
                  ))}
              </div>

              <div className='col-md-4'>
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

                      <div className={styles.cart__summaryRow}>
                        <strong>Total count:</strong>
                        <div>{cartCountTotal}</div>
                      </div>

                      {getPromocodeActive().length === 0 && (
                        <div className={styles.cart__summaryRow}>
                          <strong>Total amount:</strong>
                          <div>${cartTotal}</div>
                        </div>
                      )}

                      {cartTotal !== oldCartTotal && (
                        <del className={styles.cart__summaryRow}>
                          <strong>Total amount:</strong>
                          <div>${oldCartTotal}</div>
                        </del>
                      )}

                      {getPromocodeActive().map((promocode) => (
                        <>
                          <div
                            className={
                              styles.cart__summaryRow +
                              ' ' +
                              styles.cart__summaryRowPromo
                            }>
                            <strong>Promocode ({promocode.name})</strong>
                            <div>-{promocode.discount}%</div>
                          </div>
                        </>
                      ))}
                      {cartTotal !== oldCartTotal && (
                        <div className={styles.cart__summaryRow}>
                          <strong>
                            Total amount (-{getPromocodeActiveSummDiscount()}
                            %)
                          </strong>
                          <div>${cartTotal}</div>
                        </div>
                      )}
                    </div>
                    <div className='input-group mt-3'>
                      <input
                        onChange={handleChangePromocode}
                        type='text'
                        className='form-control'
                        placeholder='Promo code'
                        name='promoCode'
                      />
                    </div>

                    <div className={styles.cart__coupon}>
                      {listPromocode.map((promocode, index) => (
                        <CartPromocode
                          promocode={promocode}
                          getPromocodeActive={getPromocodeActive}
                          setPromocodeStatus={setPromocodeStatus}
                          index={index}
                          key={index}
                        />
                      ))}
                    </div>
                    <button
                      onClick={openModal}
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
