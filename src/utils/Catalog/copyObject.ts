export function copyObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// import { includes } from 'lodash';
// import { IResultProduct, IFilterData, TypeFilterMap } from '../../models';
// import { copyObject } from '../../utils/Catalog/copyObject';

// export function updateActiveFilterData(
//   products: IResultProduct[],
//   startFilterData: IFilterData,
//   endFilterData: IFilterData,
//   setEndFilterData: (data: IFilterData) => void,
// ): void {
//   const newActiveFilterData: IFilterData = JSON.parse(
//     JSON.stringify(endFilterData),
//   );
// if (newActiveFilterData.categories && startFilterData.categories)
//   newActiveFilterData.categories = updateInputCheckout(
//     newActiveFilterData.categories,
//     startFilterData.categories,
//     products,
//   );

// if (newActiveFilterData.brands && startFilterData.brands)
//   newActiveFilterData.brands = updateInputCheckout(
//     newActiveFilterData.brands,
//     startFilterData.brands,
//     products,
//   );

//   setEndFilterData(newActiveFilterData);
// }

// function updateInputCheckout(
//   dataEnd: TypeFilterMap[],
//   dataStart: TypeFilterMap[],
//   products: IResultProduct[],
// ): TypeFilterMap[] {
//   let countTrue = 0;
//   let countAvailable = 0;
//   let dataCopy: TypeFilterMap[] = JSON.parse(JSON.stringify(dataEnd));
//   dataCopy.forEach((item: TypeFilterMap) => {
//     item.available = 0;
//     item.available = products.filter((products) => {
//       return item.key === products.category;
//     }).length;
//     countTrue += 1;

//     countAvailable += item.available;
//   });
//   if (!countTrue && !countAvailable) dataCopy = dataStart;
//   return dataCopy;
// }
