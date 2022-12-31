import {
  IResultProduct,
  IFilterData,
  TypeFilterMap,
  IActiveFilterData,
} from '../../models';

export function filterCatalogProducts(
  products: IResultProduct[],
  endFilterData: IFilterData,
  activeFilterData: IActiveFilterData,
  setActiveFilterDataUrl: (data: IActiveFilterData) => void,
) {
  console.log('activeFilterData => ', activeFilterData);

  activeFilterData.categories = [];
  activeFilterData.brands = [];
  activeFilterData.price = [];
  activeFilterData.stock = [];

  console.log('filterCatalogProducts => endFilterData', endFilterData);

  if (
    endFilterData.price &&
    (endFilterData.price.valueMin !== -1 || endFilterData.price.valueMax !== -1)
  ) {
    const priceValueMin =
      endFilterData.price.valueMin !== -1
        ? endFilterData.price.valueMin
        : endFilterData.price.min;
    !activeFilterData.price.includes(String(priceValueMin)) &&
      activeFilterData.price.push(String(priceValueMin));

    const priceValueMax =
      endFilterData.price.valueMax !== -1
        ? endFilterData.price.valueMax
        : endFilterData.price.max;
    !activeFilterData.price.includes(String(priceValueMax)) &&
      activeFilterData.price.push(String(priceValueMax));
  }

  if (
    endFilterData.stock &&
    (endFilterData.stock.valueMin !== -1 || endFilterData.stock.valueMax !== -1)
  ) {
    const stockValueMin =
      endFilterData.stock.valueMin !== -1
        ? endFilterData.stock.valueMin
        : endFilterData.stock.min;
    !activeFilterData.stock.includes(String(stockValueMin)) &&
      activeFilterData.stock.push(String(stockValueMin));
    const stockValueMax =
      endFilterData.stock.valueMax !== -1
        ? endFilterData.stock.valueMax
        : endFilterData.stock.max;
    !activeFilterData.stock.includes(String(stockValueMax)) &&
      activeFilterData.stock.push(String(stockValueMax));
  }

  // Set Start Data
  if (endFilterData) {
    endFilterData.categories &&
      endFilterData.categories.forEach((category: TypeFilterMap) => {
        if (category.status) {
          activeFilterData.categories &&
            !activeFilterData.categories.includes(category.key) &&
            activeFilterData.categories.push(category.key);
        }
      });

    endFilterData.brands &&
      endFilterData.brands.forEach((brand: TypeFilterMap) => {
        if (brand.status) {
          activeFilterData.brands &&
            !activeFilterData.brands.includes(brand.key) &&
            activeFilterData.brands.push(brand.key);
        }
      });
  }

  // Set Active Data
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

  if (!activeFilterData.price[0] || !activeFilterData.price[1]) {
    activeFilterData.price = [];
  }

  if (!activeFilterData.stock[0] || !activeFilterData.stock[1]) {
    activeFilterData.stock = [];
  }

  if (
    (Number(activeFilterData.price[0]) === Number(endFilterData.price?.min) &&
      Number(activeFilterData.price[1]) === Number(endFilterData.price?.max)) ||
    (Number(activeFilterData.stock[0]) === Number(endFilterData.stock?.min) &&
      Number(activeFilterData.stock[1]) === Number(endFilterData.stock?.max))
  ) {
    activeFilterData.stock = [];
    activeFilterData.price = [];
  }

  if (activeFilterData.price && activeFilterData.price.length > 0) {
    const priceMin = activeFilterData.price[0];
    const priceMax = activeFilterData.price[1];
    filterProducts = filterProducts.filter(
      (product) =>
        product.price >= Number(priceMin) && product.price <= Number(priceMax),
    );
  }

  if (activeFilterData.stock && activeFilterData.stock.length > 0) {
    const stockMin = activeFilterData.stock[0];
    const stockMax = activeFilterData.stock[1];
    console.log('stockMin', stockMin);
    console.log('stockMax', stockMax);
    filterProducts = filterProducts.filter(
      (product) =>
        product.stock >= Number(stockMin) && product.stock <= Number(stockMax),
    );
  }

  setActiveFilterDataUrl(activeFilterData);
  return filterProducts;
}
