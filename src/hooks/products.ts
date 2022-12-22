import { useEffect, useState } from 'react';
import { IProduct, IResultProduct } from '../models';
import axios, { AxiosError } from 'axios';

type TypeUseProduct<T> = {
  result: T;
  error: string;
  loading: boolean;
  setResult: (result: T) => void;
};

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
): TypeUseProduct<IResultProduct[]> {
  const urlFetch = search.length > 0 ? `search?q=${search}` : '?limit=60';
  const resultObject = [
    {
      id: 0,
      title: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
    },
  ];

  const [result, setResult] = useState<IResultProduct[]>(resultObject);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    setError('');
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${urlFetch}`,
      );
      if (response.data.total !== 0) {
        const products: IResultProduct[] = response.data.products;
        const productsSort = sortProduct(products, sort);
        setResult(productsSort);
        if (response.data.products[0]['id'] > 0) setLoading(false);
      } else {
        setResult([]);
        setLoading(false);
        setError('Not Results');
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      setError(error.message);
    }
  }

  useEffect(() => {
    console.log('fetchProduct');
    fetchProduct();
  }, [search, sort]);

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
