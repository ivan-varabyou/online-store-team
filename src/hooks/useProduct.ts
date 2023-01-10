import { useEffect, useState } from 'react';
import { IResultProduct, TypeReturnProducts } from '../models';
import axios, { AxiosError } from 'axios';
import { data } from '../db/products';

export function useProduct(id: number): IResultProduct | null {
  const dataProducts: IResultProduct = data.products.filter(
    (item) => item.id === id,
  )[0];
  const [result, setResult] = useState<IResultProduct | null>(dataProducts);

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
