import { useEffect, useState } from 'react';
import { IProduct, IResult } from '../models';
import axios, { AxiosError } from 'axios';

type TypeUseProduct = { result: IProduct; error: string; loading: boolean };
type TypeUseProducts = { result: IResult; error: string; loading: boolean };

export function getProducts(): TypeUseProducts {
  const urlFetch = 'https://dummyjson.com/products?limit=100';
  const [result, setResult] = useState<IResult>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

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

export function getProduct(id: number): TypeUseProduct {
  const urlFetch = 'https://dummyjson.com/products/' + id;
  const [result, setResult] = useState<IProduct>({});

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
