import React, { useState } from 'react';
import { ICatalogFilterCheckbox } from '../../../../models';
import styles from './CatalogFilterCheckbox.module.scss';

export const CatalogFilterCheckbox = ({
  data,
  index,
  updateInputCheckbox,
  name,
}: ICatalogFilterCheckbox) => {
  const [checkboxStatus, setCheckboxStatus] = useState(data.status);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.classList.contains('active')) {
      data.status = false;
    } else {
      data.status = true;
    }
    setCheckboxStatus(!checkboxStatus);
    updateInputCheckbox(data, name, index);
  };

  return (
    <>
      <label className={`${styles.checkbox} form-check mb-2`} key={data.key}>
        <input
          data-type={name}
          name={name}
          type='checkbox'
          onChange={handleChange}
          data-index={index}
          value={data.name}
          className={
            data.status
              ? `${styles.checkboxActive} ${styles.checkboxHide} active`
              : `${styles.checkboxPasive} ${styles.checkboxHide} pasive`
          }
          defaultChecked={checkboxStatus}
        />
        <span
          className={
            data.status
              ? `${styles.checkboxActive}`
              : `${styles.checkboxPasive}`
          }>
          {data.name}
        </span>

        <b
          className={`${
            styles.checkboxCount
          } badge rounded-pill float-end  bg-${
            data.available == 0 ? 'secondary' : 'primary'
          }`}>
          {data.available} / {data.count}
        </b>
      </label>
    </>
  );
};
