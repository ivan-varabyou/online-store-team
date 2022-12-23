import { useEffect, useState } from 'react';
import { IProduct, IResultProduct } from '../models';
import axios, { AxiosError } from 'axios';

type TypeUseProduct<T> = {
  result: T;
  error: string;
  loading: boolean;
  setResult: (result: T) => void;
};

function searchProduct(result: IResultProduct[], search: string) {
  const searchText = search.toLowerCase();
  return result.filter((product: IResultProduct) => {
    if (
      product.title &&
      product.description &&
      product.brand &&
      product.price &&
      product.stock
    ) {
      if (
        product.title.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText) ||
        String(product.price).includes(searchText) ||
        String(product.stock).includes(searchText)
      )
        return true;
    }
    return false;
  });
}

function sortProduct(result: IResultProduct[], sort: string) {
  const newResults = result;
  newResults.sort((a, b) => a.id - b.id);
  if (sort === 'price-ASC') newResults.sort((a, b) => a.price - b.price);
  if (sort === 'price-DESC') newResults.sort((a, b) => b.price - a.price);
  if (sort === 'rating-ASC') newResults.sort((a, b) => a.rating - b.rating);
  if (sort === 'rating-DESC') newResults.sort((a, b) => b.rating - a.rating);
  if (sort === 'discount-ASC')
    newResults.sort(
      (a, b) =>
        Math.ceil(b.discountPercentage) - Math.ceil(a.discountPercentage),
    );
  if (sort === 'discount-DESC')
    newResults.sort(
      (a, b) =>
        Math.ceil(a.discountPercentage) - Math.ceil(b.discountPercentage),
    );
  return newResults;
}

export function getCatalogProducts(
  search: string,
  sort: string,
): TypeUseProduct<IResultProduct[] | null> {
  const [fetchResult, setFetchResult] = useState<IResultProduct[] | null>(null);

  const [result, setResult] = useState<IResultProduct[] | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    setError('');
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

  //  return [];
  // setLoading(false);
  // setError('Not Results');

  useEffect(() => {
    setLoading(true);
    if (fetchResult === null) {
      fetchProduct();
    } else {
      let products = JSON.parse(JSON.stringify(fetchResult));
      products = searchProduct(products, search);
      products = sortProduct(products, sort);
      setResult(products);
    }
    setLoading(false);
  }, [fetchResult, search, sort]);

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
