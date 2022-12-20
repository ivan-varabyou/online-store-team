import React from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../hooks/products';
import { IProduct } from '../models';
import { Link } from 'react-router-dom';
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
                  <button
                    type='button'
                    className='btn btn-primary productPage__buttons'>
                    add to cart
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
