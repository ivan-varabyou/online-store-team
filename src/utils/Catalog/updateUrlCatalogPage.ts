import { TypeQuery, IActiveFilterData } from '../../models';

export const updateUrlCatalogPage = (
  value: string,
  catalogSortSelect: string,
  catalogProductDisplay: string,
  setSearchUrl: (query: TypeQuery) => void,
  activeFilterData: IActiveFilterData,
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

  const copyActiveFilterData = JSON.parse(JSON.stringify(activeFilterData));

  if (copyActiveFilterData.categories) {
    query.categories = copyActiveFilterData.categories.join(';');
  }
  if (query.categories?.length === 0) {
    delete query.categories;
  }

  if (copyActiveFilterData.brands) {
    query.brands = copyActiveFilterData.brands.join(';');
  }
  if (query.brands?.length === 0) {
    delete query.brands;
  }

  if (copyActiveFilterData.price) {
    query.price = copyActiveFilterData.price.join(';');
  }
  if (query.price?.length === 0) {
    delete query.price;
  }

  if (copyActiveFilterData.stock) {
    query.stock = copyActiveFilterData.stock.join(';');
  }
  if (query.stock?.length === 0) {
    delete query.stock;
  }

  if (value && value?.length > 0) {
    query.search = String(value);
  }
  if (query.search?.length === 0) {
    delete query.search;
  }
  if (catalogSortSelect && catalogSortSelect?.length > 0) {
    query.sort = String(catalogSortSelect);
  }
  if (query.sort?.length === 0 || query.sort === 'default') {
    delete query.sort;
  }

  if (catalogProductDisplay === 'list') {
    query.grid = String(catalogProductDisplay);
  }

  if (query.grid?.length === 0) {
    delete query.grid;
  }

  setSearchUrl(query);
};
