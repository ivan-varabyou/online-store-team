import React from 'react';
import {
  TypeFilterMap,
  ICatalogFilter,
  TypeFilterRange,
} from '../../../models';

import { CatalogFilterCheckbox } from './CatalogFilterCheckbox/';
import { CatalogFilterRange } from './CatalogFilterRange/';

import styles from './CatalogFilter.module.scss';

export const CatalogFilter: React.FC<ICatalogFilter> = ({
  endFilterData,
  statusFilter,
  setStatusFilter,
  setEndFilterData,
}) => {
  function updateInputCheckbox(
    data: TypeFilterMap,
    name: string,
    index: number,
  ) {
    const copyEndFilterData = JSON.parse(JSON.stringify(endFilterData));
    copyEndFilterData[name][index] = data;
    setEndFilterData(copyEndFilterData);
    setStatusFilter(!statusFilter);
  }

  function updateInputRange(data: TypeFilterRange) {
    const copyEndFilterData = JSON.parse(JSON.stringify(endFilterData));
    copyEndFilterData[data.key] = data;
    setEndFilterData(copyEndFilterData);
    setStatusFilter(!statusFilter);
  }

  return (
    <>
      <button
        className='btn btn-outline-secondary mb-3 w-100  d-lg-none'
        data-bs-toggle='collapse'
        data-bs-target='#aside_filter'>
        Show filter
      </button>

      <div className={styles.filter + ' collapse card d-lg-block filter'}>
        <article className='filter-group'>
          <header className='card-header'>
            <div className='title'>
              <i className='icon-control fa fa-chevron-down'></i>
              Category
            </div>
          </header>
          <div className='collapse show' id='filter-category'>
            <div className='card-body'>
              {endFilterData &&
                endFilterData.categories?.map((category, index) => (
                  <CatalogFilterCheckbox
                    key={category.key}
                    data={category}
                    index={index}
                    updateInputCheckbox={updateInputCheckbox}
                    name='categories'
                  />
                ))}
            </div>
          </div>
        </article>
        <article className='filter-group'>
          <header className='card-header'>
            <div className='title'>
              <i className='icon-control fa fa-chevron-down'></i>
              Brand
            </div>
          </header>
          <div className='collapse show' id='filter-category'>
            <div className='card-body'>
              {endFilterData &&
                endFilterData.brands?.map((brand, index) => (
                  <CatalogFilterCheckbox
                    key={brand.key}
                    data={brand}
                    index={index}
                    updateInputCheckbox={updateInputCheckbox}
                    name='brands'
                  />
                ))}
            </div>
          </div>
        </article>
        {endFilterData.price && (
          <CatalogFilterRange
            data={endFilterData.price}
            updateInputRange={updateInputRange}
            name='Price'
          />
        )}
        {endFilterData.stock && (
          <CatalogFilterRange
            data={endFilterData.stock}
            updateInputRange={updateInputRange}
            name='Stock'
          />
        )}
      </div>
    </>
  );
};
