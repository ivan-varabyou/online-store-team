import React, { useState, useEffect, useContext, useCallback } from 'react';

import copy from 'copy-to-clipboard';
import { useSearchParams } from 'react-router-dom';
import { useCatalogProducts } from '../hooks/useCatalogProducts';

// utils
import { updateUrlCatalogPage } from '../utils/сatalog/updateUrlCatalogPage';

// components
import { ErrorMessage } from '../components/ErrorMessage/';
import { CatalogProduct } from '../components/Catalog/CatalogProduct';
import { CatalogFilter } from '../components/Catalog/CatalogFilter';
import { CatalogSort } from '../components/Catalog/CatalogSort';
import { CatalogDisplay } from '../components/Catalog/CatalogDisplay';

// context
import { SearchContext } from '../App';

import debounce from 'lodash.debounce';

//classes
import { FilterData } from '../utils/FilterData';
import { FilterDataActive } from '../utils/FilterDataActive';

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
  const firstFilterDataDefault: FilterData = new FilterData();

  const [startFilterData, setStartFilterData] = React.useState(
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

  const activeFilterDataUrlDefaultNull: FilterDataActive =
    new FilterDataActive();

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
    setSearchValue && setSearchValue('');
    setSearchUrl({});
    setCatalogSortSelect('default');
    setEndFilterData(startFilterData);
    setActiveFilterDataUrl(activeFilterDataUrlDefaultNull);
    setStatusFilter(!statusFilter);
  };

  // Copy URL button
  const hendleCopyFilterUrlButton = () => {
    copy(window.location.href);
  };

  const [search] = useSearchParams();

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue && setSearchValue(value);
    }, 500),
    [],
  );

  useEffect(() => {
    if (search.get('search') && !searchValue) {
      setSearchValue && setSearchValue(String(search.get('search')));
    }
  }, []);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const copyEndFilterData = JSON.parse(JSON.stringify(endFilterData));
    copyEndFilterData.price.valueMin = -1;
    copyEndFilterData.price.valueMax = -1;
    copyEndFilterData.stock.valueMin = -1;
    copyEndFilterData.stock.valueMax = -1;
    setEndFilterData(copyEndFilterData);
    setSearchValue && setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue && setSearchValue('');
    updateSearchValue('');
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
                <div className={styles.products__search + ' mb-1'}>
                  <input
                    onInput={onChangeInput}
                    type='text'
                    className='form-control'
                    placeholder='Search'
                    value={searchValue}
                  />
                  {searchValue && (
                    <span
                      onClick={clearSearch}
                      className={styles.products__clearSearch}>
                      <i className='bi bi-x-circle-fill'></i>
                    </span>
                  )}
                </div>

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
                  {loading && 'Loading ...'}
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
