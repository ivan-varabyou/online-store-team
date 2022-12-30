import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { Link, useSearchParams } from 'react-router-dom';
import { IPromocode, TypeCartItem } from '../models';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { CartProduct } from '../components/Cart/CartProduct';
import { CartPromocode } from '../components/Cart/CartPromocode';

import styles from '../scss/page/CartPage.module.scss';
import { ChangeEvent } from 'react';

export function CardPage() {
  const PAGE_PRODUCT_LIMIT = 4;
  const getCartCount = useContext(CartContext).getCartCount;
  const getCartTotal = useContext(CartContext).getCartTotal;
  const getLocalStorage = useContext(CartContext).getLocalStorage;
  const getCartDiscountTotal = useContext(CartContext).getCartDiscountTotal;
  const handleModalStatus = useContext(CartContext).handleModalStatus;

  const modalStatus = useContext(CartContext).modalStatus;

  const [url, setUrl] = useSearchParams();

  const [page, setPage] = useState(
    url.get('page') ? Number(url.get('page')) : 1,
  );

  const [productsCart, setProductsCart] = useState(
    getLocalStorage && getLocalStorage<TypeCartItem>('cart'),
  );

  let productsCartPage: TypeCartItem[] = [];

  const getStartPage = (page: number, limit: number) => {
    return page * limit - limit;
  };

  const getMaxCountPage = (arrayLength: number, limit: number) => {
    return Math.ceil(arrayLength / limit);
  };

  const updateCartProductsPage = () => {
    if (productsCart) {
      productsCartPage = [];
      const startIndex = getStartPage(page, PAGE_PRODUCT_LIMIT);
      const endIndex = startIndex + PAGE_PRODUCT_LIMIT;

      for (let i = startIndex; i < endIndex; i++) {
        if (productsCart.length - 1 < i) break;
        productsCartPage.push(productsCart[i]);
      }
    }
  };
  updateCartProductsPage();

  let listCartPage: number[] = [];
  const updateCartPage = () => {
    listCartPage = [];
    if (productsCart) {
      const limitPage = getMaxCountPage(
        productsCart.length,
        PAGE_PRODUCT_LIMIT,
      );
      for (let page = 1; page <= limitPage; page++) {
        listCartPage.push(page);
      }
    }
  };
  updateCartPage();

  useEffect(() => {
    updateCartProductsPage();
    updateCartPage();
    if (productsCart) {
      const limitPage = getMaxCountPage(
        productsCart.length,
        PAGE_PRODUCT_LIMIT,
      );
      if (Number(url.get('page')) > limitPage) {
        setUrl({ page: String(limitPage) });
        setPage(limitPage);
      }
    }
  }, [page, productsCart]);

  // Modal
  const openModal = () => {
    handleModalStatus && handleModalStatus(true);
  };

  useEffect(() => {
    if (url.get('modal') === 'buy' && !modalStatus) {
      openModal();
      setUrl({});
    }
  }, []);

  // Promocode
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

  // Summary
  let cartTotal, oldCartTotal, cartCountTotal, cartDiscount, cartSumm;

  if (getCartTotal) cartTotal = +getCartTotal().toString();
  if (cartTotal) oldCartTotal = cartTotal;

  if (getCartCount) cartCountTotal = getCartCount();
  if (getCartDiscountTotal && cartTotal)
    cartDiscount = getCartDiscountTotal() - cartTotal;
  if (cartTotal && cartDiscount) cartSumm = cartTotal + cartDiscount;

  if (getPromocodeActiveSummDiscount() > 0 && cartTotal) {
    const discount = getPromocodeActiveSummDiscount();
    cartTotal = Math.round(cartTotal / 100) * (100 - discount);
  }

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
                <span className={styles.cart__page}> | Page {page}</span>
              </p>
            </div>
          </section>
          <div className='container  mb-4'>
            <div className='row mt-4'>
              <div className='col-md-8'>
                {productsCartPage.map((product) => (
                  <CartProduct
                    product={product}
                    key={product.id}
                    setProductsCart={setProductsCart}
                  />
                ))}

                <div className='row mt-2 '>
                  <ul className='pagination'>
                    {listCartPage.length > 1 &&
                      listCartPage.map((listPage) => (
                        <li
                          key={listPage}
                          className={
                            (page === listPage ? ' active' : '') + ' page-item'
                          }>
                          <Link
                            onClick={() => setPage(listPage)}
                            className='page-link'
                            to={`/cart?page=${listPage}`}>
                            {listPage}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
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
                        type='search'
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
