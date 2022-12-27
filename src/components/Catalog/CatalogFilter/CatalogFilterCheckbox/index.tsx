import React, { useState } from 'react';
import { TypeFilterMap } from '../../../../models';
import styles from './CatalogFilterCheckbox.module.scss';

export const CatalogFilterCheckbox = ({
  category,
  index,
  handleCatalogFilterCheckbox,
  type,
}: {
  category: TypeFilterMap;
  index: number;
  handleCatalogFilterCheckbox: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  type: string;
}) => {
  return (
    <>
      <label
        className={`${styles.checkbox} form-check mb-2`}
        key={category.key}>
        <input
          data-index={index}
          data-type={type}
          type='checkbox'
          onChange={handleCatalogFilterCheckbox}
          value={category.name}
          className={
            category.status
              ? `${styles.checkboxActive} ${styles.checkboxHide} active`
              : `${styles.checkboxPasive} ${styles.checkboxHide} pasive`
          }
          defaultChecked={category.status}
        />
        <span
          className={
            category.status
              ? `${styles.checkboxActive}`
              : `${styles.checkboxPasive}`
          }>
          {category.name}
        </span>

        <b
          className={`${
            styles.checkboxCount
          } badge rounded-pill float-end  bg-${
            category.available == 0 ? 'secondary' : 'primary'
          }`}>
          {category.available} / {category.count}
        </b>
      </label>
    </>
  );
};
