import { IFilterData, TypeFilterMap, IResultProduct } from '../../models';

export const getFilterData = (
  result: IResultProduct[],
  setActiveFilterData: (filterData: IFilterData) => void,
  setStartFilterData?: (filterData: IFilterData) => void,
): void => {
  if (result) {
    const categoryList: Map<string, TypeFilterMap> = new Map();
    const brandList: Map<string, TypeFilterMap> = new Map();
    const priceList = {
      min: -1,
      max: 0,
      value: 0,
      count: 0,
      available: 0,
      key: 'pirce',
    };
    const stockList = {
      min: -1,
      max: 0,
      value: 0,
      count: 0,
      available: 0,
      key: 'stock',
    };

    result.forEach((product) => {
      // category
      updateFilterCheckbox(product.category, categoryList);

      // brand
      updateFilterCheckbox(product.brand, brandList);

      if (priceList.min > product.price || priceList.min < 0) {
        priceList.min = product.price;
      }
      if (priceList.max < product.price) {
        priceList.max = product.price;
      }
      if (stockList.min > product.stock || stockList.min < 0) {
        stockList.min = product.stock;
      }
      if (stockList.max < product.stock) {
        stockList.max = product.stock;
      }
    });

    const newFilterData: IFilterData = {
      categories: [...categoryList.values()],
      brands: [...brandList.values()],
      price: priceList,
      stock: stockList,
    };

    setStartFilterData && setStartFilterData(newFilterData);
    setActiveFilterData(newFilterData);
  }
};

function updateFilterCheckbox(type: string, list: Map<string, TypeFilterMap>) {
  if (list.has(type)) {
    const category: TypeFilterMap | undefined = list.get(type);
    if (category) {
      category.count += 1;
      category.available += 1;
    }
  } else {
    const nameLowerCase = type.toLowerCase();
    const name = `${nameLowerCase
      .replace(/(-)/g, ' ')
      .slice(0, 1)
      .toUpperCase()}${nameLowerCase.slice(1)}`;

    const key = type;

    list.set(key, {
      name: name,
      count: 1,
      available: 1,
      key: key,
      status: false,
    });
  }
}
