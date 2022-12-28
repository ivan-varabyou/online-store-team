import { IResultProduct } from '../../models';

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
