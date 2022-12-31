import { useEffect, useState } from 'react';
import { IResultProduct, TypeReturnProducts } from '../models';
import axios, { AxiosError } from 'axios';

export function useProduct(id: number): IResultProduct | null {
  const [result, setResult] = useState<IResultProduct | null>(null);

  async function fetchProduct() {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      if (response.data && response.data !== null) {
        setResult(response.data);
      }
    } catch (e: unknown) {
      console.error(e as AxiosError);
    }
  }

  if (result === null) {
    fetchProduct();
  }
  return result;
}
