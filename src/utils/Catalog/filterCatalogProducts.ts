import { useEffect } from 'react';
import {
  IResultProduct,
  IFilterData,
  TypeFilterMap,
  IActiveFilterData,
} from '../../models';

export function filterCatalogProducts(
  products: IResultProduct[],
  startFilterData: IFilterData,
  activeFilterData: IActiveFilterData,
  setActiveFilterDataUrl: (data: IActiveFilterData) => void,
) {
  activeFilterData.categories = [];
  activeFilterData.brands = [];

  // useEffect(() => {
  //   activeFilterData.categories = activeFilterData.categories;
  //   activeFilterData.brands = activeFilterData.brands;
  // }, []);

  // if (!(activeFilterData.brands || activeFilterData.categories)) {

  if (startFilterData) {
    startFilterData.categories &&
      startFilterData.categories.forEach((category: TypeFilterMap) => {
        if (category.status) {
          activeFilterData.categories &&
            !activeFilterData.categories.includes(category.key) &&
            activeFilterData.categories.push(category.key);
        }
      });

    startFilterData.brands &&
      startFilterData.brands.forEach((brand: TypeFilterMap) => {
        if (brand.status) {
          activeFilterData.brands &&
            !activeFilterData.brands.includes(brand.key) &&
            activeFilterData.brands.push(brand.key);
        }
      });
  }
  // }

  let filterProducts = products;
  if (
    (activeFilterData.categories && activeFilterData.categories.length > 0) ||
    (activeFilterData.brands && activeFilterData.brands.length > 0)
  ) {
    filterProducts = filterProducts.filter(
      (product) =>
        (activeFilterData.categories &&
          activeFilterData.categories.includes(product.category)) ||
        (activeFilterData.brands &&
          activeFilterData.brands.includes(product.brand)),
    );
  }

  setActiveFilterDataUrl(activeFilterData);

  return filterProducts;
}
