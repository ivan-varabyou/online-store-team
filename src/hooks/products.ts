import { useEffect, useState } from 'react';
import { IProduct, IResultProduct, TypeReturnProducts } from '../models';
import axios, { AxiosError } from 'axios';

import sortProduct from './filter';
import searchProduct from './search';

export function getCatalogProducts(
  search: string,
  sort: string,
): TypeReturnProducts<IResultProduct[] | null> {
  const [fetchResult, setFetchResult] = useState<IResultProduct[] | null>(null);

  const [result, setResult] = useState<IResultProduct[] | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/?limit=120`,
      );
      if (response.data.total > 0) {
        setFetchResult(response.data.products);
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    setError('');
    setLoading(true);
    if (fetchResult === null) {
      fetchProduct();
    } else {
      let products = JSON.parse(JSON.stringify(fetchResult));
      products = searchProduct(products, search);
      if (products.length === 0) {
        setResult(products);
        setError('No results found');
      } else {
        products = sortProduct(products, sort);
        setResult(products);
      }
    }
    setLoading(false);
  }, [fetchResult, search, sort]);

  return { result, error, loading, setResult };
}

export function getProducts(urlFetch: string, resultObject: IProduct[]) {
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
