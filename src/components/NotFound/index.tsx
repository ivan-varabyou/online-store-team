import React from 'react';

import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <div className='row align-items-center'>
        <div className='col-lg-6 order-lg-2'>
          <article className='my-5 ms-lg-5'>
            <h1 className='display-2'>Not Found 404</h1>
            <p className='lead'>This page is no longer available</p>
            <Link to='/' className='btn btn-light btn-lg'>
              Go Shopping
            </Link>
          </article>
        </div>
        <div className='col-lg-6 order-lg-1'>
          <img
            src='https://learn.techmagnox.com/assets/img/error.gif'
            className='mw-100'
            height='500'
          />
        </div>
      </div>
    </>
  );
};
