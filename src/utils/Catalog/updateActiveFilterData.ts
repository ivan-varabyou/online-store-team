import { includes } from 'lodash';
import {
  IResultProduct,
  IFilterData,
  TypeFilterMap,
  TypeFilterRangeOrNull,
} from '../../models';

export function updateActiveFilterData(
  products: IResultProduct[],
  startFilterData: IFilterData,
  endFilterData: IFilterData,
  setEndFilterData: (data: IFilterData) => void,
): void {
  console.log('Доделать фильрацию');
  const newActiveFilterData: IFilterData = JSON.parse(
    JSON.stringify(
      (endFilterData.categories && endFilterData) || startFilterData,
    ),
  );

  if (startFilterData.categories && endFilterData.categories)
    newActiveFilterData.categories = updateInputCheckout(
      products,
      'category',
      startFilterData.categories,
      endFilterData.categories,
    );

  if (startFilterData.brands && endFilterData.brands)
    newActiveFilterData.brands = updateInputCheckout(
      products,
      'brand',
      startFilterData.brands,
      endFilterData.brands,
    );

  newActiveFilterData.price = updateInputRange(
    endFilterData.price,
    startFilterData.price,
  );

  newActiveFilterData.stock = updateInputRange(
    endFilterData.stock,
    startFilterData.stock,
  );

  setEndFilterData(newActiveFilterData);
}

const updateInputRange = (
  dataEnd: TypeFilterRangeOrNull,
  dataStart: TypeFilterRangeOrNull,
) => {
  return dataEnd ? dataEnd : dataStart;
};

function updateInputCheckout(
  products: IResultProduct[],
  productProperty: string,
  dataStart: TypeFilterMap[],
  dataEnd: TypeFilterMap[],
): TypeFilterMap[] {
  let countTrue = 0;
  let countAvailable = 0;
  let dataCopy: TypeFilterMap[] = JSON.parse(JSON.stringify(dataEnd));
  dataCopy.forEach((item: TypeFilterMap) => {
    item.available = 0;
    item.available = products.filter((product) => {
      return item.key === product[productProperty as keyof IResultProduct];
    }).length;
    countTrue += 1;

    countAvailable += item.available;
  });
  if (countTrue === 0 && countAvailable === 0) dataCopy = dataStart;
  return dataCopy;
}
