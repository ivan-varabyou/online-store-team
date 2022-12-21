import React from 'react';

import styles from './CatalogFilter.module.scss';

import { CatalogFilterCheckbox } from './CatalogFilterCheckbox/';

type TypeFilterCheckbox = { name: string; status: boolean };
type TypeFilterRange = {
  min: number;
  max: number;
  value: number;
};

interface IFilterParemetr {
  data: {
    category: Array<TypeFilterCheckbox>;
    brand: Array<TypeFilterCheckbox>;
    price: TypeFilterRange;
    stock: TypeFilterRange;
  };
}

export const CatalogFilter = (
  data: IFilterParemetr,
  onChangeFilter: () => void,
) => {
  console.log(onChangeFilter);
  const filterCategogy = data.data.category;
  const filterBrand = data.data.brand;
  const filterPrice = data.data.price;
  const filterStock = data.data.stock;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    // onChangeFilter(event.target.value);
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
              {filterCategogy.map((category) => (
                <label className='form-check mb-2' key={category.name}>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    onChange={handleChange}
                    value={category.name}
                  />
                  <span className='form-check-label'>{category.name}</span>
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
              {filterBrand.map((brand) => (
                <label className='form-check mb-2' key={brand.name}>
                  <input className='form-check-input' type='checkbox' />
                  <span className='form-check-label'>{brand.name}</span>
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
                min={filterPrice.min}
                max={filterPrice.max}
              />

              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={'$' + filterPrice.min}
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
                    placeholder={'$' + filterPrice.max}
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
                min={filterStock.min}
                max={filterStock.max}
              />

              <div className='row mb-3'>
                <div className='col-6'>
                  <label className='form-label'>Min</label>
                  <input
                    className='form-control'
                    id='min'
                    placeholder={'$' + filterStock.min}
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
                    placeholder={'$' + filterStock.max}
                    type='number'
                    min='0'
                    max='10000'
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className='btn-group col-12'>
          <button className='btn btn-light btn-icon'>Copy link</button>
          <button className='btn btn-light btn-icon'>Reset</button>
        </div>
      </div>
    </>
  );
};
