import React from 'react';
import { TypeCartItem } from '../../../models';
import styles from './CartProduct.module.scss';
import { Link } from 'react-router-dom';

export const CartProduct = ({
  product,
}: {
  product: TypeCartItem;
}): JSX.Element => {
  return (
    <>
      <div className='card card-body mb-1' key={product.id}>
        <div className='row gy-3'>
          <div className='row mt-4'>
            <div className='col-lg-1'>
              <Link to={'/product/' + product.id}>
                <img src={product.thumbnail} className='img-thumbnail' />
              </Link>
            </div>

            <div className='col-lg-8'>
              <Link to={'/product/' + product.id}>
                <h6 className='title'>{product.title}</h6>
              </Link>
              <strong>
                ${product.price} x {product.count}
              </strong>
            </div>

            <div className='col-lg-2'>
              <input
                type='text'
                className='form-control'
                value={product.count}
              />
            </div>

            <div className='col-lg-1'>
              <button className='btn btn-icon btn-danger'>
                <i className='bi bi-trash'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
