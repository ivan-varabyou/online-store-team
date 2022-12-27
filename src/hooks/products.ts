import { useEffect, useState } from 'react';
import {
  IResultProduct,
  TypeReturnProducts,
  IFilterData,
  IActiveFilterData,
} from '../models';
import axios, { AxiosError } from 'axios';

import { sortCatalogProducts } from '../utils/Catalog/sortCatalogProducts';
import { searchCatalogProducts } from '../utils/Catalog/searchCatalogProducts';
import { filterCatalogProducts } from '../utils/Catalog/filterCatalogProducts';
import { updateActiveFilterData } from '../utils/Catalog/updateActiveFilterData';
import { getFilterDataStart } from '../utils/Catalog/getFilterData';
import { getFilterDataEnd } from '../utils/Catalog/getFilterData';

export function getCatalogProducts(
  search: string,
  sort: string,

  startFilterData: IFilterData,
  setStartFilterData: (filterData: IFilterData) => void,

  endFilterData: IFilterData,
  setEndFilterData: (filterData: IFilterData) => void,

  statusFilter: boolean,
  setStatusFilter: (status: boolean) => void,

  activeFilterDataUrl: IActiveFilterData,
  setActiveFilterDataUrl: (data: IActiveFilterData) => void,
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
    if (!fetchResult) {
      fetchProduct();
    } else {
      let products: IResultProduct[] = JSON.parse(JSON.stringify(fetchResult));

      products = searchCatalogProducts(products, search);

      if (endFilterData.categories) {
        products = filterCatalogProducts(
          products,
          endFilterData,
          activeFilterDataUrl,
          setActiveFilterDataUrl,
        );
      }

      products = sortCatalogProducts(products, sort);

      updateActiveFilterData(
        products,
        startFilterData,
        endFilterData,
        setEndFilterData,
      );

      if (products.length === 0) {
        setError('No results found');
      }

      setResult(products);
    }
    setLoading(false);
  }, [fetchResult, search, sort, statusFilter]);

  useEffect(() => {
    if (fetchResult) {
      const newFilterDataStart = getFilterDataStart(fetchResult);
      setStartFilterData(newFilterDataStart);
      let newFilterDataEnd;

      if (
        activeFilterDataUrl.brands?.length ||
        activeFilterDataUrl.categories?.length ||
        activeFilterDataUrl.price ||
        activeFilterDataUrl.stock
      ) {
        newFilterDataEnd = getFilterDataEnd(
          newFilterDataStart,
          activeFilterDataUrl,
        );
      } else {
        newFilterDataEnd = newFilterDataStart;
      }

      setEndFilterData(newFilterDataEnd);
      setStatusFilter(!statusFilter);
    }
  }, [fetchResult]);

  return { result, error, loading };
}
