import { IResultProduct } from '../../models';

import { lowerCaseIncludes } from '../common/string/lowerCaseIncludes';

export function searchCatalogProducts(
  result: IResultProduct[],
  search: string,
): IResultProduct[] {
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
        lowerCaseIncludes(product.title, searchText) ||
        lowerCaseIncludes(product.description, searchText) ||
        lowerCaseIncludes(product.brand, searchText) ||
        lowerCaseIncludes(String(product.price), searchText) ||
        lowerCaseIncludes(String(product.stock), searchText)
      )
        return true;
    }
    return false;
  });
}
