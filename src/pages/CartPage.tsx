import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import { IResultProduct } from '../models';
import { clear, log } from 'console';
import { CartEmpty } from '../components/CartEmpty';
import { useProduct } from '../hooks/useProduct';
import { useHref, useParams } from 'react-router-dom';
import { CartProduct } from '../components/CartProduct';


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
  const { productId } = useParams();
  const { result, error, loading } = useProduct(Number(productId));

 

  if(productsCart?.length == 0) {
    return (
      <div>
        <CartEmpty/>
      </div>
    )
  } else {
    return (
      <div>
        {productsCart &&     
        productsCart.map((product) => (
          <CartProduct product={product} key={product.id} />
        ))}
      </div>
    );
  }

  
}
