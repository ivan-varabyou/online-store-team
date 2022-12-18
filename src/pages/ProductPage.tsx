import React from 'react';
import { useParams } from 'react-router-dom';

export function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      <h1>Product Page {productId}</h1>
    </div>
  );
}
