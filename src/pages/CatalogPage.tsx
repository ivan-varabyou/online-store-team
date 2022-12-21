import React, { useState, useEffect, EventHandler, FormEvent } from 'react';
import qs from 'qs';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { getCatalogProducts } from '../hooks/products';
import { IResultProduct } from '../models';
import { ProductCardGrid } from '../components/ProductCardGrid';
import { ScaletonCatalog } from '../components/ScaletonCatalog/';
import { ErrorMessage } from '../components/ErrorMessage/';
import { CatalogFilter } from '../components/CatalogFilter/';

import styles from '../scss/page/CategoryPage.module.scss';

export function CatalogPage() {
  const navigate = useNavigate();
  const { result, error, loading, setResult } = getCatalogProducts(
    'https://dummyjson.com/products?limit=100',
    [
      {
        id: 0,
        title: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
      },
    ],
  );

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
    }
  }, []);

  /* --------selected----------*/
  type ISelectList = { value: string; text: string };
  const [selected, setSelected] = useState('default');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelected(event.target.value);
  };
  const selectList: ISelectList[] = [
    { value: 'default', text: 'Sort default' },
    { value: 'price-ASC', text: 'Sort by price ASC' },
    { value: 'price-DESC', text: 'Sort by price DESC' },
    { value: 'rating-ASC', text: 'Sort by rating ASC' },
    { value: 'rating-DESC', text: 'Sort by rating DESC' },
    { value: 'discount-ASC', text: 'Sort by discount ASC' },
    { value: 'discount-DESC', text: 'Sort by discount DESC' },
  ];
  /* ------------------*/

  /* ------GRID---------- */

  const [cardGrid, setCardGrid] = useState('grid');
  const listActive = cardGrid === 'list' && 'active';
  const gridActive = cardGrid === 'grid' && 'active';

  /* ------------------*/

  const filterParametr = {
    category: [
      { name: 'category name', status: false },
      { name: 'category name2', status: true },
    ],
    brand: [
      { name: 'brand name', status: false },
      { name: 'brand name2', status: true },
    ],
    price: {
      min: 0,
      max: 100,
      value: 50,
    },
    stock: {
      min: 0,
      max: 100,
      value: 50,
    },
  };

  const [filterData, setfilterData] = useState(filterParametr);

  useEffect(() => {
    console.log(filterData);
    const newResults = [...result];
    newResults.sort((a, b) => a.id - b.id);
    if (selected === 'price-ASC') newResults.sort((a, b) => a.price - b.price);
    if (selected === 'price-DESC') newResults.sort((a, b) => b.price - a.price);
    if (selected === 'rating-ASC')
      newResults.sort((a, b) => a.rating - b.rating);
    if (selected === 'rating-DESC')
      newResults.sort((a, b) => b.rating - a.rating);
    if (selected === 'discount-ASC')
      newResults.sort(
        (a, b) =>
          Math.ceil(b.discountPercentage) - Math.ceil(a.discountPercentage),
      );
    if (selected === 'discount-DESC')
      newResults.sort(
        (a, b) =>
          Math.ceil(a.discountPercentage) - Math.ceil(b.discountPercentage),
      );
    console.log(selected, newResults);
    setResult(newResults);
  }, [selected, filterData]);

  useEffect(() => {
    const queryString = qs.stringify({
      sort: selected,
    });
    navigate(`?${queryString}`);
    console.log(queryString);
  }, [selected, filterData]);

  return (
    <>
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Category name</h1>
            <p className={styles.products__items}>
              {result.length} Items found
            </p>
          </div>
        </section>
        <div className='container'>
          <div className={styles.products}>
            <div className='row'>
              <aside className='col-lg-3'>
                <CatalogFilter
                  data={filterData}
                  onChangeFilter={setfilterData}
                />
              </aside>
              <div className='col-lg-9'>
                <div className='row'>
                  <div className={styles.products__options}>
                    <select
                      value={selected}
                      onChange={handleChange}
                      className='form-select d-inline-block w-auto'
                      id='optionSort'>
                      {selectList.map((opt: ISelectList, id: number) => (
                        <option value={opt?.value} key={id}>
                          {opt?.text}
                        </option>
                      ))}
                    </select>

                    <div className='btn-group'>
                      <span
                        onClick={() => setCardGrid('list')}
                        className={listActive + ' btn btn-light'}>
                        <i className='bi bi-list'></i>
                      </span>
                      <span
                        onClick={() => setCardGrid('grid')}
                        className={gridActive + ' btn btn-light'}>
                        <i className='bi bi-grid-3x3-gap-fill'></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={'product-' + cardGrid}>
                  {loading && <ScaletonCatalog />}
                  {error && <ErrorMessage error={error} />}
                  {!loading &&
                    result.map((product) => (
                      <ProductCardGrid product={product} key={product.id} />
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
