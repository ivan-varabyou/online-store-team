import React, { useState, useEffect, useContext } from 'react';

import copy from 'copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { useCatalogProducts } from '../hooks/useCatalogProducts';
import { IFilterData, IActiveFilterData } from '../models';

// utils
import { updateUrlCatalogPage } from '../utils/catalog/updateUrlCatalogPage';

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
    ? String(searchUrl.get('grid'))
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
  const [endFilterData, setEndFilterData] = useState(firstFilterDataDefault);

  const activeFilterDataUrlDefault = () => {
    return {
      brands: searchUrl.get('brands')
        ? String(searchUrl.get('brands')).split(';')
        : null,
      categories: searchUrl.get('categories')
        ? String(searchUrl.get('categories')).split(';')
        : null,

      price: searchUrl.get('price')
        ? String(searchUrl.get('price')).split(';')
        : null,
      stock: searchUrl.get('stock')
        ? String(searchUrl.get('stock')).split(';')
        : null,
    };
  };

  const activeFilterDataUrlDefaultNull: IActiveFilterData = {
    brands: null,
    categories: null,
    price: null,
    stock: null,
  };

  const dataUrlDefault = JSON.parse(
    JSON.stringify(activeFilterDataUrlDefault()),
  );

  const [activeFilterDataUrl, setActiveFilterDataUrl] =
    useState(dataUrlDefault);

  const [statusFilter, setStatusFilter] = useState(false);

  // get products for catalog
  const { result, error, loading } = useCatalogProducts(
    String(searchValueDefault),
    String(catalogSortSelect),

    startFilterData,
    setStartFilterData,
    endFilterData,
    setEndFilterData,
    statusFilter,
    setStatusFilter,
    activeFilterDataUrl,
    setActiveFilterDataUrl,
  );

  // Change url when changing properties
  useEffect(() => {
    updateUrlCatalogPage(
      searchValue,
      catalogSortSelect,
      catalogProductDisplay,
      setSearchUrl,
      activeFilterDataUrl,
    );
  }, [catalogSortSelect, searchValue, catalogProductDisplay, statusFilter]);

  // Change url when start page
  useEffect(() => {
    updateUrlCatalogPage(
      searchValueDefault,
      catalogSortSelect,
      catalogProductDisplay,
      setSearchUrl,
      activeFilterDataUrl,
    );
  }, []);

  // Reset data button
  const hendleResetFilterButton = () => {
    setSearchUrl({});
    setCatalogSortSelect('default');
    if (setSearchValue) setSearchValue('');
    setEndFilterData(startFilterData);
    setActiveFilterDataUrl(activeFilterDataUrlDefaultNull);
    setStatusFilter(!statusFilter);
  };

  // Copy URL button
  const hendleCopyFilterUrlButton = () => {
    copy(window.location.href);
  };

  return (
    <>
      <main>
        <section className='bg-primary py-4'>
          <div className='container'>
            <h1 className={styles.products__title}>Catalog</h1>
            <p className={styles.products__items}>
              {result && result.length} Products
            </p>
          </div>
        </section>
        <div className='container'>
          <div className={styles.products}>
            <div className='row'>
              <aside className='col-lg-3'>
                <div className='btn-group col-12 button-group'>
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
                    endFilterData={endFilterData}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    setEndFilterData={setEndFilterData}
                  />
                }
                <div className='btn-group col-12 button-group'>
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
