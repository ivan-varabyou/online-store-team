import React from 'react';
import { IPromocode } from '../../../models';
import styles from './CartPromocode.module.scss';

export const CartPromocode = ({
  promocode,
  setPromocodeStatus,
  index,
}: {
  promocode: IPromocode;
  setPromocodeStatus: (promocodeIndex: number, status: boolean) => void;
  index: number;
}) => {
  React.useState();
  return (
    <>
      <span className={styles.couponExample}>
        <i className='bi bi-tags'></i>
        <b>{promocode.name}</b> -{promocode.discount}%
        {promocode.input === true && !promocode.status && (
          <button
            data-status={promocode.status}
            className='btn btn-success btn-sm'
            onClick={() => setPromocodeStatus(index, !promocode.status)}>
            add
          </button>
        )}
        {promocode.status && (
          <button
            data-status={promocode.status}
            className='btn btn-danger btn-sm'
            onClick={() => setPromocodeStatus(index, !promocode.status)}>
            remove
          </button>
        )}
      </span>
    </>
  );
};
