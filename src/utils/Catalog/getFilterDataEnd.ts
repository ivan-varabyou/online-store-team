import {
  IFilterData,
  TypeFilterMap,
  IActiveFilterData,
  TypeFilterRange,
} from '../../models';

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

  let brandList: TypeFilterMap[] | null = null;
  if (filterDataStart.brands) {
    brandList = updateFilterDataEndCheckbox(
      filterDataStart.brands,
      activeFilterDataUrl.brands,
    );
  }

  let priceList: TypeFilterRange | null = null;
  if (filterDataStart.price) {
    priceList = updateFilterDataEndRange(
      filterDataStart.price,
      activeFilterDataUrl.price,
    );
  }

  let priceStock: TypeFilterRange | null = null;
  if (filterDataStart.stock) {
    priceStock = updateFilterDataEndRange(
      filterDataStart.stock,
      activeFilterDataUrl.stock,
    );
  }

  const newFilterDataEnd: IFilterData = {
    categories: categoryList,
    brands: brandList,
    price: priceList,
    stock: priceStock,
  };

  return newFilterDataEnd;
};

function updateFilterDataEndRange(
  itemsData: TypeFilterRange,
  itemsUrl: string[] | null,
): TypeFilterRange {
  const newItemsData: TypeFilterRange = JSON.parse(JSON.stringify(itemsData));
  if (itemsUrl?.length) {
    newItemsData.valueMin = Number(itemsUrl[0]);
    newItemsData.valueMax = Number(itemsUrl[1]);
  }
  return newItemsData;
}

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
