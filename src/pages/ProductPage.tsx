import React from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../hooks/products';

export function ProductPage() {
  const { productId } = useParams();
  const { result, error, loading } = getProduct(Number(productId));
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
