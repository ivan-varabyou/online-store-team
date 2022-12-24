import { useEffect, useState } from 'react';
import { IResultProduct, TypeReturnProducts } from '../models';
import axios, { AxiosError } from 'axios';

export function useProduct(
  id: number
): TypeReturnProducts<IResultProduct | null> {
  const [fetchResult, setFetchResult] = useState<IResultProduct | null >(null);

  const [result, setResult] = useState<IResultProduct | null >(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${id}` ,
      );
      if (response.data && response.data !== null) {
        setResult(response.data);
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return { result, error, loading };
}
