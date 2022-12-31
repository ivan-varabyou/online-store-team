import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { Link, useSearchParams } from 'react-router-dom';
import { IPromocode, TypeCartItem } from '../models';
import { CartEmpty } from '../components/Cart/CartEmpty/index';
import { CartProduct } from '../components/Cart/CartProduct/index';
import { CartPromocode } from '../components/Cart/CartPromocode/index';

import styles from '../scss/page/CartPage.module.scss';
import { ChangeEvent } from 'react';

export function CardPage() {
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

  const [limitProduct, setlimitProduct] = useState(
    url.get('limit') ? Number(url.get('limit')) : 3,
  );

  const handleChangelimitProduct = (e: ChangeEvent<HTMLInputElement>) => {
    if (productsCart && productsCart.length >= Number(e.target.value)) {
      setlimitProduct(Number(e.target.value));
    }
  };

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
      const startIndex = getStartPage(page, limitProduct);
      const endIndex = startIndex + limitProduct;

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
      const limitPage = getMaxCountPage(productsCart.length, limitProduct);
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
      const limitPage = getMaxCountPage(productsCart.length, limitProduct);
      if (Number(url.get('page')) > limitPage) {
        setPage(limitPage);
      }
      updateUrl();
      if (productsCart.length < limitProduct) {
        setlimitProduct(productsCart.length);
      }
    }
  }, [page, productsCart, limitProduct]);

  const updateUrl = () => {
    if (productsCart) {
      setUrl({ page: String(page), limit: String(limitProduct) });
    }
  };

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
    cartTotal = (cartTotal / 100) * (100 - discount);
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
              <div className={styles.cart__items}>
                <div className={styles.cart__limit}>
                  <span>Limit:</span>
                  <input
                    onChange={handleChangelimitProduct}
                    value={limitProduct}
                    type='number'
                    min='1'
                    max='100'
                    className=' form-control text-center d-inline-block w-auto'></input>
                </div>
                <div>Page {page}</div>
                <div>Items {productsCart && productsCart.length}</div>
              </div>
            </div>
          </section>

          <div className='container  mb-4'>
            <div className='row mt-4'>
              <div className='col-md-8'>
                {productsCartPage.map((product, index) => (
                  <CartProduct
                    product={product}
                    setProductsCart={setProductsCart}
                    index={index}
                    page={page}
                    limit={limitProduct}
                    key={product.id}
                  />
                ))}
                <div className='row mt-2 input-group'>
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
                            to={`/cart?page=${listPage}&limit=${limitProduct}`}>
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
