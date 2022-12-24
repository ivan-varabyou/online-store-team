import React, { useState, useEffect, useContext } from 'react';

import copy from 'copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { getCatalogProducts } from '../hooks/products';
import { ProductCardGrid } from '../components/ProductCardGrid';
import { ScaletonCatalog } from '../components/ScaletonCatalog/';
import { ErrorMessage } from '../components/ErrorMessage/';
import { CatalogFilter } from '../components/CatalogFilter/';

import { SearchContext } from '../App';

import styles from '../scss/page/CategoryPage.module.scss';

export function CatalogPage() {
  const searchValue = String(useContext(SearchContext).searchValue);
  const setSearchValue = useContext(SearchContext).setSerachValue;

  /* --------GET QUERY URL ----------*/

  const [searchUrl, setSearchUrl] = useSearchParams();

  const defaultSelect = searchUrl.get('sort')
    ? String(searchUrl.get('sort'))
    : 'default';
  const [selected, setSelected] = useState(defaultSelect);

  const searchValueDefault: string = searchUrl.get('search')
    ? String(searchUrl.get('search'))
    : String(searchValue);

  /* ------GRID---------- */

  const gridDefault: string = searchUrl.get('grid')
    ? String(searchUrl.get('search'))
    : 'grid';

  const [cardGrid, setCardGrid] = useState(gridDefault);
  const listActive = cardGrid === 'list' && 'active';
  const gridActive = cardGrid === 'grid' && 'active';

  /* --------FETCH ----------*/

  const { result, error, loading } = getCatalogProducts(
    String(searchValueDefault),
    String(selected),
  );

  /* --------SET QUERY URL ----------*/
  type TypeQuery = {
    sort?: string;
    search?: string;
    grid?: string;
  };

  function updateQueryUrl(value: string) {
    const query: TypeQuery = {};

    if (value && value?.length > 0) {
      query.search = String(value);
    }
    if (value?.length === 0) {
      delete query.search;
    }
    if (selected && selected?.length > 0) {
      query.sort = String(selected);
    }
    if (selected?.length === 0 || selected === 'default') {
      delete query.sort;
    }

    if (cardGrid === 'list') {
      query.grid = String(cardGrid);
    }

    setSearchUrl(query);
  }

  useEffect(() => {
    updateQueryUrl(searchValue);
  }, [selected, searchValue, cardGrid]);

  useEffect(() => {
    updateQueryUrl(searchValueDefault);
  }, []);

  /* --------selected----------*/
  type ISelectList = { value: string; text: string };
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

  /* ---------filterParametr---------*/

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

  /*---RESET BUTTON----*/
  const hendleResetUrl = () => {
    setSearchUrl({});
    setSelected('default');
    if (setSearchValue) setSearchValue('');
  };

  const hendleCopyUrl = () => {
    copy(window.location.href);
  };

  return (
    <>
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Category name</h1>
            <p className={styles.products__items}>
              {result && result.length} Items found
            </p>
          </div>
        </section>
        <div className='container'>
          <div className={styles.products}>
            <div className='row'>
              <aside className='col-lg-3'>
                <div className='btn-group col-12'>
                  <button
                    className='btn btn-light btn-icon'
                    onClick={hendleCopyUrl}>
                    Copy
                  </button>

                  <button
                    onClick={hendleResetUrl}
                    className='btn btn-light btn-icon'>
                    Reset
                  </button>
                </div>
                <CatalogFilter
                  data={filterData}

                  // onChangeFilter={setfilterData}
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
                  {result &&
                    !loading &&
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
