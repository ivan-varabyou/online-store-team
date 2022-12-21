import { useEffect, useState } from 'react';
import { IProduct, IResultProduct } from '../models';
import axios, { AxiosError } from 'axios';

type TypeUseProduct<T> = {
  result: T;
  error: string;
  loading: boolean;
  setResult: (result: T) => void;
};

export function getCatalogProducts<T>(
  urlFetch: string,
  resultObject: IResultProduct[],
): TypeUseProduct<IResultProduct[]> {
  const [result, setResult] = useState<IResultProduct[]>(resultObject);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    try {
      setError('');
      const response = await axios.get(urlFetch);
      const products: IResultProduct[] = response.data.products;
      const productsTwo: IResultProduct[] = products.sort(
        (a, b) => a.id - b.id,
      );

      setResult(productsTwo);

      if (response.data.products[0]['id'] > 0) setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return { result, error, loading, setResult };
}

export function getProducts(urlFetch: string, resultObject: IResultProduct[]) {
  const [result, setResult] = useState(resultObject);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get(urlFetch);
      setResult(response.data);
      setLoading(false);
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
