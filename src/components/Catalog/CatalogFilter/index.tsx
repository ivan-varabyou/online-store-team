import React, { useEffect, useState } from 'react';
import {
  IResultProduct,
  IFilterData,
  ICatalogFilterData,
} from '../../../models';

import { CatalogFilterCheckbox } from './CatalogFilterCheckbox/';

import styles from './CatalogFilter.module.scss';

export const CatalogFilter = ({
  endFilterData,
  statusFilter,
  setStatusFilter,
  setEndFilterData,
}: {
  endFilterData: IFilterData;
  statusFilter: boolean;
  setStatusFilter: (status: boolean) => void;
  setEndFilterData: (data: IFilterData) => void;
}) => {
  const handleCatalogFilterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;
    const newData: IFilterData = JSON.parse(JSON.stringify(endFilterData));

    if (type === 'categories' && newData['categories']) {
      if (event.target.classList.contains('active')) {
        newData['categories'][index].status = false;
      } else {
        newData['categories'][index].status = true;
      }
    }

    if (type === 'brands' && newData['brands']) {
      if (event.target.classList.contains('active')) {
        newData['brands'][index].status = false;
      } else {
        newData['brands'][index].status = true;
      }
    }

    setEndFilterData(newData);
    setStatusFilter(!statusFilter);
    // console.log('setEndFilterData START', index, type, newData);
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
              {endFilterData &&
                endFilterData.categories?.map((category, index) => (
                  <CatalogFilterCheckbox
                    key={category.key}
                    category={category}
                    index={index}
                    handleCatalogFilterCheckbox={handleCatalogFilterCheckbox}
                    type='categories'
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
                    category={brand}
                    index={index}
                    handleCatalogFilterCheckbox={handleCatalogFilterCheckbox}
                    type='brands'
                  />
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
                name='priceMin'
                type='range'
                className='form-range'
                min={endFilterData && endFilterData.price?.min}
                max={endFilterData && endFilterData.price?.max}
                value={
                  endFilterData.price?.valueMin === -1
                    ? endFilterData.price?.min
                    : endFilterData.price?.valueMin
                }
              />

              <input
                name='priceMax'
                type='range'
                className='form-range'
                min={endFilterData && endFilterData.price?.min}
                max={endFilterData && endFilterData.price?.max}
                value={
                  endFilterData.price?.valueMax === -1
                    ? endFilterData.price?.max
                    : endFilterData.price?.valueMax
                }
              />
              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={
                      endFilterData.price && endFilterData.price.min
                        ? String(endFilterData.price.min)
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
                      endFilterData.price && endFilterData.price.max
                        ? String(endFilterData.price.max)
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
        {/* <article className='filter-group'>
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
                min={endFilterData && endFilterData.stock?.min}
                max={endFilterData && endFilterData.stock?.max}
              />
              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={
                      endFilterData.stock && endFilterData.stock.min
                        ? String(endFilterData.stock.min)
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
                      endFilterData.stock && endFilterData.stock.max
                        ? String(endFilterData.stock.max)
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
        </article> */}
      </div>
    </>
  );
};
