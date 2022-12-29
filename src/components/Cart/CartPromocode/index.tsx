import React from 'react';
import { IPromocode } from '../../../models';
import styles from './CartPromocode.module.scss';

export const CartPromocode = ({
  promocode,
  index,
  setPromo,
}: {
  promocode: IPromocode;
  index?: number;
  setPromo: (promocode: IPromocode | null) => void;
}) => {
  return (
    <>
      <span className={styles.couponExample}>
        <i className='bi bi-tags'></i>
        <b>{promocode.name}</b>: -{promocode.discount}%
      </span>
      {!(index > -1) && (
        <button className='btn btn-danger' onClick={() => setPromo(null)}>
          remove code
        </button>
      )}
    </>
  );
};
