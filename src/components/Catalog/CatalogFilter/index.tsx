import React, { useEffect, useState } from 'react';
import {
  IResultProduct,
  IFilterData,
  ICatalogFilterData,
} from '../../../models';

import styles from './CatalogFilter.module.scss';

export const CatalogFilter = ({
  activeFilterData,
  setActiveFilterData,
}: {
  activeFilterData: IFilterData;
  setActiveFilterData: (newData: IFilterData) => void;
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const newData: IFilterData = JSON.parse(JSON.stringify(activeFilterData));

    if (type === 'categories' && newData['categories']) {
      // console.log('test 1', type, newData['categories']);
      newData['categories'][index].status = newData['categories'][index].status
        ? false
        : true;
    }

    if (type === 'brands' && newData['brands']) {
      newData['brands'][index].status = newData['brands'][index].status
        ? false
        : true;
    }

    setActiveFilterData(newData);

    // console.log('setActiveFilterData START', index, type, newData);
  };

  return (
    <>
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
              <i className='icon-control fa fa-chevron-down'></i>
              Category
            </div>
          </header>
          <div className='collapse show' id='filter-category'>
            <div className='card-body'>
              {activeFilterData &&
                activeFilterData.categories?.map((category, index) => (
                  <label className='form-check mb-2' key={category.key}>
                    <input
                      data-index={index}
                      data-type='categories'
                      className={
                        category.status
                          ? 'form-check-input active'
                          : 'form-check-input pasive'
                      }
                      type='checkbox'
                      onChange={handleInput}
                      value={category.name}
                    />
                    <span className='form-check-label'>{category.name}</span>
                    <b
                      className={
                        'badge rounded-pill float-end  bg-' +
                        (category.count == 0 ? 'dark' : 'primary')
                      }>
                      {category.count}
                    </b>
                  </label>
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
              {activeFilterData &&
                activeFilterData.brands?.map((brand, index) => (
                  <label className='form-check mb-2' key={brand.key}>
                    <input
                      data-index={index}
                      data-type='brands'
                      className={
                        brand.status
                          ? 'form-check-input active'
                          : 'form-check-input pasive'
                      }
                      type='checkbox'
                      onChange={handleInput}
                      value={brand.name}
                    />
                    <span className='form-check-label'>{brand.name}</span>
                    <b
                      className={
                        'badge rounded-pill float-end  bg-' +
                        (brand.available == 0 ? 'dark' : 'primary')
                      }>
                      {brand.available}
                    </b>
                  </label>
                ))}
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
                min={activeFilterData && activeFilterData.price?.min}
                max={activeFilterData && activeFilterData.price?.max}
              />
              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={
                      activeFilterData.price && activeFilterData.price.min
                        ? String(activeFilterData.price.min)
                        : '0'
                    }
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
                    placeholder={
                      activeFilterData.price && activeFilterData.price.max
                        ? String(activeFilterData.price.max)
                        : '0'
                    }
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
              Stock
            </div>
          </header>
          <div className='collapse show' id='filter-stock'>
            <div className='card-body'>
              <input
                type='range'
                className='form-range'
                min={activeFilterData && activeFilterData.stock?.min}
                max={activeFilterData && activeFilterData.stock?.max}
              />
              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={
                      activeFilterData.stock && activeFilterData.stock.min
                        ? String(activeFilterData.stock.min)
                        : '0'
                    }
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
                    placeholder={
                      activeFilterData.stock && activeFilterData.stock.max
                        ? String(activeFilterData.stock.max)
                        : '0'
                    }
                    type='number'
                    min='0'
                    max='10000'
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};
