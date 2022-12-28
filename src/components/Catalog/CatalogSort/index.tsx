import React from 'react';

import styles from './CatalogSort.module.scss';

import { ICatalogSort, ICatalogSortProps } from '../../../models';

export const CatalogSort = ({
  catalogSortSelect,
  setCatalogSortSelect,
}: ICatalogSortProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setCatalogSortSelect(event.target.value);
  };

  const selectList: ICatalogSort[] = [
    { value: 'default', text: 'Sort default' },
    { value: 'price-ASC', text: 'Sort by price ASC' },
    { value: 'price-DESC', text: 'Sort by price DESC' },
    { value: 'rating-ASC', text: 'Sort by rating ASC' },
    { value: 'rating-DESC', text: 'Sort by rating DESC' },
    { value: 'discount-ASC', text: 'Sort by discount ASC' },
    { value: 'discount-DESC', text: 'Sort by discount DESC' },
  ];

  return (
    <>
      <select
        value={catalogSortSelect}
        onChange={handleChange}
        className={`${styles.select} form-select d-inline-block w-auto`}
        id='optionSort'>
        {selectList.map((opt: ICatalogSort, id: number) => (
          <option value={opt?.value} key={id}>
            {opt?.text}
          </option>
        ))}
      </select>
    </>
  );
};
