import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss';

export function CartEmpty({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  React.useState();
  return (
    <div className='container'>
      <div className='row mt-4 mb-4'>
        <div className={styles.cartEmpty}>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <img
              className={styles.cartEmptyImage}
              src={image}
              alt='Empty cart'
            />
          </div>
          <Link to='/' className='btn btn-primary btn-lg'>
            Go Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
