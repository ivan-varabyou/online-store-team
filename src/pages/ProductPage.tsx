import React, {useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { IResultProduct } from '../models';
import { Link } from 'react-router-dom';
import styles from './../scss/page/ProductPage.module.scss';
import { CartContext } from '../App';


export function ProductPage() {
  const { productId } = useParams();
  const { result, error, loading } = useProduct(Number(productId));
  console.log(result, error, loading);
  if (result !== null) {
    const title = result.title;

  }
  const addProductsCart = useContext(CartContext).addProductsCart;
  const removeProductCart = useContext(CartContext).removeProductCart;
  const isAddCart = useContext(CartContext).isAddCart;
  const getCartCount = useContext(CartContext).getCartCount;
  const getCartTotal = useContext(CartContext).getCartTotal;
  const getLocalStorage = useContext(CartContext).getLocalStorage;
  const updateCartCountAndSumm = useContext(CartContext).updateCartCountAndSumm;

  const dafaultStatusAddToCart =
  isAddCart && productId && isAddCart(Number(productId));
const [statusAddToCart, setStatusAddToCart] = useState(
  dafaultStatusAddToCart,
);
const buttonAddToCartText = statusAddToCart ? 'Remove' : 'Add to cart';
const handleButtonCart = (): void => {
  if (statusAddToCart) {
    removeProductCart && removeProductCart(Number(productId), 1);
    setStatusAddToCart(false);
  } else {
    result && addProductsCart && addProductsCart(result, 1);
    setStatusAddToCart(true);
  }
  updateCartCountAndSumm && updateCartCountAndSumm();
};

  return (
    <>
    {
      result !== null && 
      
      <main className='container'>
        <div className={styles.productPage}>
          <div className={styles.ProductPage__title}>
            <h1>{result.title}</h1>
          </div>
          <div className={styles.productPage__imageBlock}>
            <div
              className={styles.productPage__imgContainer}
              style={{ backgroundImage: `url(${result.thumbnail})` }}></div>
          </div>
          <div className={styles.productPage__infoBlock}>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Description:
                <span>{result.description}</span>
              </p>
            </div>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Discount Percentage:
                <span>{result.discountPercentage}</span>
              </p>
            </div>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Rating:
                <span>{result.rating}</span>
              </p>
            </div>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Stock:
                <span>{result.stock}</span>
              </p>
            </div>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Brand:
                <span>{result.brand}</span>
              </p>
            </div>
            <div className={styles.productPage__infoItem}>
              <p className={styles.productPage__infoText}>
                Category:
                <span>{result.category}</span>
              </p>
              <div className={styles.productPage__buttonGroup}>
                <div className={styles.productPage__buttons}>
                  <Link to='/'>
                    <button
                      type='button'
                      className='btn btn-secondary '
                      data-bs-dismiss='container'>
                      back
                    </button>
                  </Link>
                </div>
                <div className={styles.productPage__buttons}>
                  <button onClick = {handleButtonCart}
                    type='button'
                    className='btn btn-primary productPage__buttons'>
                    {buttonAddToCartText}
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    
    }
    </>
  );
}
