import React from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../hooks/products';
import { IProduct } from '../models';
import styles from './../scss/page/ProductPage.module.scss';

export function ProductPage() {
  const { productId } = useParams();
  const { result, error, loading } = getProducts<IProduct>(
    'https://dummyjson.com/products/' + Number(productId),
    {},
  );
  console.log(result, error, loading);
  return (
    <>
      <main className='container '>
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
              <p className={styles.productPage__infoText}>description:</p>
              {result.description}
            </div>
            <div>
              <p className={styles.productPage__infoText}>
                Discount Percentage:
              </p>
              {result.discountPercentage}
            </div>
            <div>
              <p className={styles.productPage__infoText}>Rating:</p>
              {result.rating}
            </div>
            <div>
              <p className={styles.productPage__infoText}>Stock:</p>
              {result.stock}
            </div>
            <div>
              <p className={styles.productPage__infoText}>Brand:</p>
              {result.brand}
            </div>
            <div>
              <p className={styles.productPage__infoText}>Category:</p>
              {result.category}
            </div>
          </div>
          <div className={styles.productPage__buttons}>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='container'>
              Close
            </button>
            <button type='button' className='btn btn-primary'>
              add to cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
