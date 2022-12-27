import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHref, useParams } from 'react-router-dom';
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
      {result !== null && (
        <main className='container'>
          <div className='row mt-3'>
            <div className={styles.productPage__breadcrumb}>
              <ol className='breadcrumb mb-0'>
                <li className='breadcrumb-item'>
                  <Link to='/'>Catalog</Link>
                </li>
                <li className='breadcrumb-item'>
                  <span>{result.category}</span>
                </li>
                <li className='breadcrumb-item'>
                  <span>{result.title}</span>
                </li>
                <li className='breadcrumb-item active'>Items</li>
              </ol>
            </div>
          </div>

          <div className='row mt-2 mb-8'>
            <div className='col-lg-6'>
              <div className='gallery-wrap gallery-vertical'>
                <div className={styles.productPage__wrapperImage + ' mb-2'} >
                  <img
                    src={result.images[0]}
                    className={styles.productPage__image}
                  />
                </div>

                <div className={styles.productPage__imagesList + '  mb-3'}>
                  <div className={styles.productPage__imageItem}>
                    <img
                      src={result.images[0]}
                      className={styles.productPage__imageItemImg}
                    />
                  </div>
                  <div className={styles.productPage__imageItem}>
                    <img
                      src={result.images[1]}
                      className={styles.productPage__imageItemImg}
                    />
                  </div>
                  <div className={styles.productPage__imageItem}>
                    <img
                      src={result.images[2]}
                      className={styles.productPage__imageItemImg}
                    />
                  </div>
                  <div className={styles.productPage__imageItem}>
                    <img
                      src={result.images[3]}
                      className={styles.productPage__imageItemImg}
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <article className='ps-lg-3'>
                <h1 className='title text-dark'>{result.title}</h1>

                <div className='mb-3'>
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
                    </div>
                  </div>
                </div>
                <div className='mb-4'>
                  <div className='price h5'>${result.price}</div> <span> </span>
                </div>

                <div className='row gx-2 mb-4'>
                  <div className='col-2'>
                    <select className='form-select'>
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                    </select>
                  </div>

                  <div className='col-auto'>
                    <a
                      onClick={handleButtonCart}
                      className='btn btn-primary w-100'>
                      {buttonAddToCartText}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
