import { useEffect, useState } from 'react';
import {
  IProduct,
  IResultProduct,
  TypeReturnProducts,
  IFilterData,
} from '../models';
import axios, { AxiosError } from 'axios';

import { sortCatalogProducts } from '../utils/Catalog/sortCatalogProducts';
import { searchCatalogProducts } from '../utils/Catalog/searchCatalogProducts';
import { filterCatalogProducts } from '../utils/Catalog/filterCatalogProducts';
import { getFilterData } from '../utils/Catalog/getFilterData';

export function getCatalogProducts(
  search: string,
  sort: string,

  startFilterData: IFilterData,
  setStartFilterData: (filterData: IFilterData) => void,

  activeFilterData: IFilterData,
  setActiveFilterData: (filterData: IFilterData) => void,
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
      let products: IResultProduct[] = JSON.parse(JSON.stringify(fetchResult));
      products = searchCatalogProducts(products, search);

      if (startFilterData.categories === null) {
        getFilterData(products, setStartFilterData, setActiveFilterData);
      }

      if (activeFilterData.categories) {
        // console.log('filterCatalogProducts RERENDERING', activeFilterData);
        products = filterCatalogProducts(
          products,
          activeFilterData,
          setActiveFilterData,
        );
      }

      products = sortCatalogProducts(products, sort);

      if (products.length === 0) {
        setError('No results found');
      }

      setResult(products);
    }
    setLoading(false);
  }, [fetchResult, search, sort, activeFilterData]);

  // result &&
  //   useEffect(() => {
  //     getFilterData(result, setActiveFilterData);
  //   }, [activeFilterData]);

  return { result, error, loading, setResult };
}
