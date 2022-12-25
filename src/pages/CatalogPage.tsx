import React, { useState, useEffect, useContext } from 'react';

import copy from 'copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { getCatalogProducts } from '../hooks/products';
import { IFilterData } from '../models';

// utils
import { updateUrlCatalogPage } from '../utils/Catalog/updateUrlCatalogPage';

// components
import { ErrorMessage } from '../components/ErrorMessage/';
import { CatalogProduct } from '../components/Catalog/CatalogProduct';
import { CatalogProductScaleton } from '../components/Catalog/CatalogProduct/CatalogProductScaleton';
import { CatalogFilter } from '../components/Catalog/CatalogFilter';
import { CatalogSort } from '../components/Catalog/CatalogSort';
import { CatalogDisplay } from '../components/Catalog/CatalogDisplay';

// context
import { SearchContext } from '../App';

// style
import styles from '../scss/page/CategoryPage.module.scss';

export function CatalogPage() {
  const searchValue = String(useContext(SearchContext).searchValue);
  const setSearchValue = useContext(SearchContext).setSerachValue;

  // searchUrl
  const [searchUrl, setSearchUrl] = useSearchParams();
  const defaultSelect = searchUrl.get('sort')
    ? String(searchUrl.get('sort'))
    : 'default';

  // catalogSortSelect
  const [catalogSortSelect, setCatalogSortSelect] = useState(defaultSelect);
  const searchValueDefault: string = searchUrl.get('search')
    ? String(searchUrl.get('search'))
    : String(searchValue);

  // catalogProductDisplay
  const catalogProductDisplayDefault: string = searchUrl.get('grid')
    ? String(searchUrl.get('search'))
    : 'grid';

  const [catalogProductDisplay, setCatalogProductDisplay] = useState(
    catalogProductDisplayDefault,
  );

  // Filter data
  const firstFilterDataDefault: IFilterData = {
    categories: null,
    brands: null,
    price: null,
    stock: null,
  };

  const [startFilterData, setStartFilterData] = useState(
    firstFilterDataDefault,
  );

  const [activeFilterData, setActiveFilterData] = useState(
    firstFilterDataDefault,
  );

  // getCatalogProducts
  const { result, error, loading } = getCatalogProducts(
    String(searchValueDefault),
    String(catalogSortSelect),

    startFilterData,
    setStartFilterData,
    activeFilterData,
    setActiveFilterData,
  );

  // updateUrlCatalogPage
  useEffect(() => {
    updateUrlCatalogPage(
      searchValue,
      catalogSortSelect,
      catalogProductDisplay,
      setSearchUrl,
    );
  }, [catalogSortSelect, searchValue, catalogProductDisplay]);

  useEffect(() => {
    updateUrlCatalogPage(
      searchValueDefault,
      catalogSortSelect,
      catalogProductDisplay,
      setSearchUrl,
    );
  }, []);
  console.log(startFilterData);
  // hendleResetFilterButton
  const hendleResetFilterButton = () => {
    setSearchUrl({});
    setCatalogSortSelect('default');
    if (setSearchValue) setSearchValue('');
    setActiveFilterData(startFilterData);
  };

  // hendleCopyFilterUrlButton
  const hendleCopyFilterUrlButton = () => {
    copy(window.location.href);
  };

  return (
    <>
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Category name</h1>
            <p className={styles.products__items}>
              {result && result.length} Products
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
                    onClick={hendleCopyFilterUrlButton}>
                    Copy
                  </button>

                  <button
                    onClick={hendleResetFilterButton}
                    className='btn btn-light btn-icon'>
                    Reset
                  </button>
                </div>
                {
                  <CatalogFilter
                    activeFilterData={activeFilterData}
                    setActiveFilterData={setActiveFilterData}
                  />
                }
              </aside>
              <div className='col-lg-9'>
                <div className='row'>
                  <div className={styles.products__options}>
                    <CatalogSort
                      setCatalogSortSelect={setCatalogSortSelect}
                      catalogSortSelect={catalogSortSelect}
                    />

                    <CatalogDisplay
                      catalogProductDisplay={catalogProductDisplay}
                      setCatalogProductDisplay={setCatalogProductDisplay}
                    />
                  </div>
                </div>
                <div className={'product-' + catalogProductDisplay}>
                  {loading && <CatalogProductScaleton />}
                  {error && <ErrorMessage error={error} />}
                  {result &&
                    !loading &&
                    result.map((product) => (
                      <CatalogProduct product={product} key={product.id} />
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
