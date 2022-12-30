import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router-dom';
import styles from './../scss/page/ProductPage.module.scss';
import { CartContext } from '../App';

import { getProductOldPrice } from '../utils/product/getProductOldPrice';
import { getStarsRatting } from '../utils/product/getStarsRatting';
import { ProductImages } from '../components/Product/ProductImages';

export function ProductPage() {
  const { productId } = useParams();
  const result = useProduct(Number(productId));

  const addProductsCart = useContext(CartContext).addProductsCart;
  const removeProductCart = useContext(CartContext).removeProductCart;
  const isAddCart = useContext(CartContext).isAddCart;
  const getCartCountProduct = useContext(CartContext).getCartCountProduct;
  const updateCartCountAndSumm = useContext(CartContext).updateCartCountAndSumm;

  const dafaultStatusAddToCart =
    isAddCart && productId && isAddCart(Number(productId));
  const [statusAddToCart, setStatusAddToCart] = useState(
    dafaultStatusAddToCart,
  );
  const buttonAddToCartText = statusAddToCart
    ? 'Drop from cart'
    : 'Add to cart';
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

  const hendleButtonByNow = () => {
    result &&
      getCartCountProduct &&
      !getCartCountProduct(result.id) &&
      addProductsCart &&
      addProductsCart(result, 1) &&
      updateCartCountAndSumm &&
      updateCartCountAndSumm();
  };

  let images: string[] = [];

  if (result) {
    images = result.images.reverse();
  }

  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      {result !== null && (
        <main className='container'>
          <div className='row mt-3'>
            <div className={styles.productPage__breadcrumb}>
              <ol className='breadcrumb mb-0'>
                <li className='breadcrumb-item'>
                  <Link to='/'>STORE</Link>
                </li>
                <li className='breadcrumb-item'>
                  <span>{result.category.toUpperCase()}</span>
                </li>
                <li className='breadcrumb-item'>
                  <span>{result.brand.toUpperCase()}</span>
                </li>
                <li className='breadcrumb-item'>
                  <span>{result.title.toUpperCase()}</span>
                </li>
              </ol>
            </div>
          </div>

          <div className='row mt-4 mb-8'>
            <div className='col-lg-6'>
              <div className='gallery-wrap gallery-vertical'>
                <div className={styles.productPage__wrapperImage + ' mb-4 '}>
                  <img
                    src={images[activeImage]}
                    className={styles.productPage__image}
                  />
                  <div
                    className={`${styles.productPage__label} ${styles.productPage__sales}`}>
                    {result.discountPercentage}%
                  </div>
                  <div
                    className={`${styles.productPage__label} ${styles.productPage__brand}`}>
                    {result.brand}
                  </div>
                </div>

                <div className={styles.productPage__imagesList + '  mb-3'}>
                  {images.map((image, index) => (
                    <ProductImages
                      image={image}
                      index={index}
                      setActiveImage={setActiveImage}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <article className='ps-lg-3'>
                <h1 className='title text-dark'>{result.title}</h1>
                <div className='row'>
                  <div className={styles.productPage__stars + ' mb-2'}>
                    {getStarsRatting(result.rating).map((star, index) => (
                      <span className={star} key={index}></span>
                    ))}
                  </div>
                </div>
                <div className='mb-3'>
                  <div className={styles.productPage__infoBlock}>
                    <div className={styles.productPage__infoItem}>
                      <p className={styles.productPage__infoText}>
                        Rating:
                        <span>{result.rating}</span>
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
                    <div className={styles.productPage__infoItem}>
                      <p className={styles.productPage__infoText}>
                        Description:
                        <span>{result.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    styles.productPage__price +
                    ' mb-4 {styles.productPage__price}'
                  }>
                  <strong className={styles.productPage__priceRegual}>
                    ${result.price}
                  </strong>
                  <del className={styles.productPage__priceOld}>
                    {getProductOldPrice(
                      result.price,
                      result.discountPercentage,
                    )}
                  </del>
                </div>

                <div className='row gx-2 mb-4'>
                  <div className='col-lg-6'>
                    <button
                      onClick={handleButtonCart}
                      className='btn btn-primary w-100 btn-lg'>
                      {buttonAddToCartText}
                    </button>
                  </div>
                  <div className='col-lg-6'>
                    <Link
                      onClick={hendleButtonByNow}
                      to='/cart?modal=buy'
                      className='btn btn-warning w-100 btn-lg'>
                      Buy Now
                    </Link>
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
