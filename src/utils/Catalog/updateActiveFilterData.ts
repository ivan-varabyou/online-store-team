import { includes } from 'lodash';
import { IResultProduct, IFilterData, TypeFilterMap } from '../../models';

export function updateActiveFilterData(
  products: IResultProduct[],
  startFilterData: IFilterData,
  endFilterData: IFilterData,
  setEndFilterData: (data: IFilterData) => void,
): void {
  const newActiveFilterData: IFilterData = JSON.parse(
    JSON.stringify(
      (endFilterData.categories && endFilterData) || startFilterData,
    ),
  );

  console.log('startFilterData', startFilterData);
  console.log('endFilterData', endFilterData);

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

  setEndFilterData(newActiveFilterData);
}

export function updateInputCheckout(
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
