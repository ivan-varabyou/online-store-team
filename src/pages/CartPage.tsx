import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import { IResultProduct } from '../models';
import { clear, log } from 'console';

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

  return (
    <>
      <main>
        <div className='container'>
          <div className='row mt-4'>
            <div className='col-md-9'>
              <div className='card card-body mb-3'>
                {productsCart &&
                  productsCart.map((product) => (
                    <div
                      className='row gy-3 align-items-center'
                      key={product.id}>
                      <div className='col-md-6'>
                        <Link
                          to={'/product/' + product.id}
                          className='itemside align-items-center'>
                          <div className='aside'>
                            <img
                              src={product.thumbnail}
                              height='72'
                              width='72'
                              className='img-thumbnail img-sm'
                            />
                          </div>
                          <div className='info'>
                            <p className='title'>{product.title}</p>
                            <span className='text-muted'>Clothes</span>
                          </div>
                        </Link>
                      </div>

                      <div className='col-auto'>
                        <div className='input-group input-spinner'>
                          <button
                            className='btn btn-light  text-back'
                            type='button'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              fill='#999'
                              viewBox='0 0 24 24'>
                              <path d='M19 13H5v-2h14v2z'></path>
                            </svg>
                          </button>
                          <input
                            type='text'
                            className='form-control'
                            value={product.count}
                          />
                          <button
                            className='btn btn-light text-back'
                            type='button'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              fill='#999'
                              viewBox='0 0 24 24'>
                              <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className='col'>
                        <strong className='price'> $180.00 </strong>
                      </div>
                      <div className='col text-end'>
                        <a href='#' className='btn btn-icon btn-danger'>
                          <i className='bi bi-trash'></i>
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
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
