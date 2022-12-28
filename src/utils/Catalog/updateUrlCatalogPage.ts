import { TypeQuery, IActiveFilterData } from '../../models';

export const updateUrlCatalogPage = (
  value: string,
  catalogSortSelect: string,
  catalogProductDisplay: string,
  setSearchUrl: (query: TypeQuery) => void,
  activeFilterDataUrl: IActiveFilterData,
) => {
  const query: TypeQuery = {
    brands: '',
    categories: '',
    price: '',
    stock: '',
    search: '',
    sort: '',
    grid: '',
  };

  const copyActiveFilterDataUrl: IActiveFilterData = JSON.parse(
    JSON.stringify(activeFilterDataUrl),
  );

  if (copyActiveFilterDataUrl.categories)
    copyActiveFilterDataUrl.categories.join(';');
  if (query.categories?.length === 0) delete query.categories;

  if (copyActiveFilterDataUrl.brands)
    query.brands = copyActiveFilterDataUrl.brands.join(';');
  if (query.brands?.length === 0) delete query.brands;

  if (copyActiveFilterDataUrl.price)
    query.price = copyActiveFilterDataUrl.price.join(';');
  if (query.price?.length === 0) delete query.price;

  if (copyActiveFilterDataUrl.stock)
    query.stock = copyActiveFilterDataUrl.stock.join(';');
  if (query.stock?.length === 0) delete query.stock;

  if (value && value?.length > 0) query.search = String(value);
  if (query.search?.length === 0) delete query.search;

  if (catalogSortSelect && catalogSortSelect?.length > 0)
    query.sort = String(catalogSortSelect);
  if (query.sort?.length === 0 || query.sort === 'default') delete query.sort;

  if (catalogProductDisplay === 'list')
    query.grid = String(catalogProductDisplay);

  if (query.grid?.length === 0) delete query.grid;

  setSearchUrl(query);
};
