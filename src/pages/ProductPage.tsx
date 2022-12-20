import React from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../hooks/products';
import { IProduct } from '../models';

export function ProductPage() {
  const { productId } = useParams();
  const { result, error, loading } = getProducts<IProduct>(
    'https://dummyjson.com/products/' + Number(productId),
    {},
  );
  console.log(result, error, loading);
  return (
    <>
      <main>
        <div className='container'>
          <h1>{result.title}</h1>
        </div>
      </main>
    </>
  );
}
