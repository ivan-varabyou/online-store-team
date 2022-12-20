import React from 'react';

// import { useSearchParams } from 'react-router-dom';

import { CardProductGrid } from '../components/CardProductGrid/';
import { getProducts } from '../hooks/products';
import { IResult } from '../models';

import styles from '../scss/page/CategoryPage.module.scss';
export function CatalogPage() {
  const { result, error, loading } = getProducts<IResult>(
    'https://dummyjson.com/products?limit=100',
    {
      products: [],
      total: 0,
      skip: 0,
      limit: 0,
    },
  );
  console.log(error, loading);
  return (
    <>
      <div className='container'>
        <div className={styles.products}>
          <div className='row'>
            <aside className='col-lg-12'>
              <main>
                <h1 className={styles.products__title}>Catalog</h1>
                <div className={styles.products__list}>
                  {result.products.map((product) => (
                    <CardProductGrid product={product} key={product.id} />
                  ))}
                </div>
              </main>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
