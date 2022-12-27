import {
  IFilterData,
  TypeFilterMap,
  IResultProduct,
  IActiveFilterData,
} from '../../models';

export const getFilterDataStart = (result: IResultProduct[]): IFilterData => {
  const categoryList: Map<string, TypeFilterMap> = new Map();
  const brandList: Map<string, TypeFilterMap> = new Map();
  const priceList = {
    min: -1,
    max: 0,
    valueMin: -1,
    valueMax: -1,
    count: 0,
    available: 0,
    key: 'pirce',
  };
  const stockList = {
    min: -1,
    max: 0,
    valueMin: -1,
    valueMax: -1,
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

  return newFilterData;
};

export const getFilterDataEnd = (
  filterDataStart: IFilterData,
  activeFilterDataUrl: IActiveFilterData,
): IFilterData => {
  let categoryList: TypeFilterMap[] | null = null;
  if (filterDataStart.categories) {
    categoryList = updateFilterDataEndCheckbox(
      filterDataStart.categories,
      activeFilterDataUrl.categories,
    );
  }

  console.log(
    'categoryList',
    categoryList,
    filterDataStart,
    activeFilterDataUrl,
  );

  let brandList: TypeFilterMap[] | null = null;
  if (filterDataStart.brands) {
    brandList = updateFilterDataEndCheckbox(
      filterDataStart.brands,
      activeFilterDataUrl.brands,
    );
  }

  console.log(
    'brandList',
    brandList,
    filterDataStart.brands,
    activeFilterDataUrl.brands,
  );

  const newFilterDataEnd: IFilterData = {
    categories: categoryList,
    brands: brandList,
    price: null,
    stock: null,
  };

  return newFilterDataEnd;
};

function updateFilterDataEndCheckbox(
  itemsData: TypeFilterMap[],
  itemsUrl: string[] | null,
): TypeFilterMap[] {
  const newItemsData: TypeFilterMap[] = JSON.parse(JSON.stringify(itemsData));
  newItemsData.forEach((item) => {
    item.status = false;
    if (itemsUrl?.length && itemsUrl.includes(String(item.key))) {
      item.status = true;
    }
  });
  return newItemsData;
}

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
