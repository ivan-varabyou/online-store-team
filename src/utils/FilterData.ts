import { TypeFilterMapArrayOrNull, TypeFilterRangeOrNull } from '../models';

export class FilterData {
  categories: TypeFilterMapArrayOrNull;
  brands: TypeFilterMapArrayOrNull;
  price: TypeFilterRangeOrNull;
  stock: TypeFilterRangeOrNull;

  constructor() {
    this.brands = null;
    this.categories = null;
    this.price = null;
    this.stock = null;
  }
}
