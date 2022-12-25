import { TypeQuery } from '../../models';

export const updateUrlCatalogPage = (
  value: string,
  catalogSortSelect: string,
  catalogProductDisplay: string,
  setSearchUrl: (query: TypeQuery) => void,
) => {
  const query: TypeQuery = {};

  if (value && value?.length > 0) {
    query.search = String(value);
  }
  if (value?.length === 0) {
    delete query.search;
  }
  if (catalogSortSelect && catalogSortSelect?.length > 0) {
    query.sort = String(catalogSortSelect);
  }
  if (catalogSortSelect?.length === 0 || catalogSortSelect === 'default') {
    delete query.sort;
  }

  if (catalogProductDisplay === 'list') {
    query.grid = String(catalogProductDisplay);
  }
  setSearchUrl(query);
};
