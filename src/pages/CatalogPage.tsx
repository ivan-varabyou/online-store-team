import React from 'react';

// import { useSearchParams } from 'react-router-dom';

import { CardProductGrid } from '../components/CardProductGrid/';
import { getProducts } from '../hooks/products';
import { IResult } from '../models';
import { ScaletonCatalog } from '../components/ScaletonCatalog/';
import { ErrorMessage } from '../components/ErrorMessage/';

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
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Category name</h1>
            <p className={styles.products__items}>
              {result.products.length} Items found
            </p>
          </div>
        </section>
        <div className='container'>
          <div className={styles.products}>
            <div className='row'>
              <aside className='col-lg-3'>
                <button
                  className='btn btn-outline-secondary mb-3 w-100  d-lg-none'
                  data-bs-toggle='collapse'
                  data-bs-target='#aside_filter'>
                  Show filter
                </button>

                <div className='collapse card d-lg-block mb-5 filter'>
                  <article className='filter-group'>
                    <header className='card-header'>
                      <div className='title'>
                        <i className='icon-control fa fa-chevron-down'></i>{' '}
                        Category
                      </div>
                    </header>
                    <div className='collapse show' id='filter-category'>
                      <div className='card-body'>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                      </div>
                    </div>
                  </article>

                  <article className='filter-group'>
                    <header className='card-header'>
                      <div className='title'>
                        <i className='icon-control fa fa-chevron-down'></i>
                        Brands
                      </div>
                    </header>
                    <div className='collapse show' id='filter-brand'>
                      <div className='card-body'>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                      </div>
                    </div>
                  </article>

                  <article className='filter-group'>
                    <header className='card-header'>
                      <div className='title'>
                        <i className='icon-control fa fa-chevron-down'></i>{' '}
                        Category
                      </div>
                    </header>
                    <div className='collapse show' id='filter-category'>
                      <div className='card-body'>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                        <label className='form-check mb-2'>
                          <input className='form-check-input' type='checkbox' />
                          <span className='form-check-label'>Honda accord</span>
                        </label>
                      </div>
                    </div>
                  </article>

                  <article className='filter-group'>
                    <header className='card-header'>
                      <div className='title'>
                        <i className='icon-control fa fa-chevron-down'></i>
                        Price
                      </div>
                    </header>
                    <div
                      className='collapse show range-filter'
                      id='filter-price'>
                      <div className='card-body'>
                        <input
                          type='range'
                          className='form-range form-range-min'
                          min='0'
                          max='100'
                        />
                        <input
                          type='range'
                          className='form-range form-range-max'
                          min='0'
                          max='100'
                        />
                        <div className='row mb-3'>
                          <div className='col-6'>
                            <label className='form-label'>Min</label>
                            <input
                              className='form-control'
                              id='min'
                              placeholder='$0'
                              type='number'
                              min='0'
                              max='10000'
                            />
                          </div>

                          <div className='col-6'>
                            <label className='form-label'>Max</label>
                            <input
                              className='form-control'
                              id='max'
                              placeholder='$1,0000'
                              type='number'
                              min='0'
                              max='10000'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className='filter-group'>
                    <header className='card-header'>
                      <div className='title'>
                        <i className='icon-control fa fa-chevron-down'></i>
                        Price
                      </div>
                    </header>
                    <div className='collapse show' id='filter-stock'>
                      <div className='card-body'>
                        <input
                          type='range'
                          className='form-range'
                          min='0'
                          max='100'
                          multiple
                          step='1'
                        />

                        <div className='row mb-3'>
                          <div className='col-6'>
                            <label className='form-label'>Min</label>
                            <input
                              className='form-control'
                              id='min'
                              placeholder='0'
                              type='number'
                              min='0'
                              max='150'
                            />
                          </div>

                          <div className='col-6'>
                            <label className='form-label'>Max</label>
                            <input
                              className='form-control'
                              id='max'
                              placeholder='150'
                              type='number'
                              min='0'
                              max='150'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </aside>
              <div className='col-lg-9'>
                <div className='row'>
                  <div className={styles.products__options}>
                    <select className='form-select d-inline-block w-auto'>
                      <option value='sort-title' disabled selected>
                        Sort options:
                      </option>
                      <option value='price-ASC'>Sort by price ASC</option>
                      <option value='price-DESC'>Sort by price DESC</option>
                      <option value='rating-ASC'>Sort by rating ASC</option>
                      <option value='rating-DESC'>Sort by rating DESC</option>
                      <option value='discount-ASC'>Sort by discount ASC</option>
                      <option value='discount-DESC'>
                        Sort by discount DESC
                      </option>
                    </select>

                    <div className='btn-group'>
                      <span className='btn btn-light'>
                        <i className='bi bi-list'></i>
                      </span>
                      <span className='btn btn-light active'>
                        <i className='bi bi-grid-3x3-gap-fill'></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className='product-grid '>
                  {loading && <ScaletonCatalog />}
                  {error && <ErrorMessage error={error} />}
                  {result.products.map((product) => (
                    <CardProductGrid product={product} key={product.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
