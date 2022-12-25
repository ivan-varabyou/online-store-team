import { forEach } from 'lodash';
import { IResultProduct, IFilterData, TypeFilterMap } from '../../models';

export function filterCatalogProducts(
  products: IResultProduct[],
  startFilterData: IFilterData,
  setActiveFilterData: (filterData: IFilterData) => void,
) {
  const listActiveCategory: string[] = [];
  const listActiveBrand: string[] = [];

  if (startFilterData) {
    startFilterData.categories &&
      startFilterData.categories.forEach((category: TypeFilterMap) => {
        if (category.status) {
          listActiveCategory.push(category.key);
        }
      });

    startFilterData.brands &&
      startFilterData.brands.forEach((brand: TypeFilterMap) => {
        if (brand.status) {
          listActiveBrand.push(brand.key);
        }
      });
  }

  if (listActiveCategory.length > 0 || listActiveBrand.length > 0) {
    return availableCheckbox(listActiveCategory, listActiveBrand, products);
  } else {
    return products;
  }
}

function availableCheckbox(
  listActiveCategory: string[],
  listActiveBrand: string[],
  products: IResultProduct[],
) {
  return products.filter(
    (product) =>
      listActiveCategory.includes(product.category) ||
      listActiveBrand.includes(product.brand),
  );
}
