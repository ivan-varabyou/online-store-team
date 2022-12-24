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

  const productsCart = getLocalStorage && getLocalStorage('cart');
  console.log(productsCart);

  return (
    <>
      <main>
        <div className='container'>
        {productsCart && productsCart.map((product) => (
                      <div className="itemside align-items-center mb-4">
                      <div className="aside"><b className="badge bg-secondary rounded-pill">
                        {product.count}</b> <img src={product.thumbnail} className="img-sm rounded border" /></div>
                      <div className="info">
                          <a href="#" className="title">{product.title}</a>
                          <div className="price text-muted">Total: ${product.price * product.count}</div>
                      </div>
                  </div>
                    ))
                    }
        </div>|
      </main>
    </>
  );
}
