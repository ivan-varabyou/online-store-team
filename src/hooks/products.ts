import { useEffect, useState } from 'react';
import { IProduct, IResult } from '../models';
import axios, { AxiosError } from 'axios';

type TypeUseProduct<T> = { result: T; error: string; loading: boolean };

export function getProducts<T>(
  urlFetch: string,
  resultObject: T,
): TypeUseProduct<T> {
  const [result, setResult] = useState<T>(resultObject);

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
