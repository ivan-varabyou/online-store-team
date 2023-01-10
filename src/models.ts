import { getCartCountProduct } from './utils/cart/getCartCountProduct';

export interface IResult {
  products: IResultProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IResultProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ISearchContext {
  searchValue: string;
  setSerachValue: React.Dispatch<string>;
  searchValueInput: string;
  setSearchValueInput: (value: string) => void;
}

export interface ICartContext {
  getLocalStorage: <T>(value: string) => [] | T[];
  setLocalStorage: <T>(key: string, value: T) => void;
  getCartTotal: () => number;
  getCartDiscountTotal: () => number;
  getCartCount: () => number;
  addProductsCart: (data: IResultProduct, count: number) => boolean;
  removeProductCart: (id: number, count: number) => boolean;
  updateProductCartCount: (id: number, count: number) => boolean;
  isAddCart: (id: number) => boolean;
  getCartCountProduct: (id: number) => number | undefined;
  getCartCountLimit: (count: number) => number;
  updateCartCountAndSumm: () => void;
  cartCount: number;
  cartTotal: number;
  handleModalStatus: (status: boolean) => void;
  modalStatus: boolean;
}

type TypeCount = {
  count: number;
};

export type TypeCartItem = IResultProduct & TypeCount;

export type TypeReturnProducts<T> = {
  result: T;
  error: string;
  loading: boolean;
};

export interface ICatalogSort {
  value: string;
  text: string;
}

export interface ICatalogSortProps {
  catalogSortSelect: string;
  setCatalogSortSelect: (sort: string) => void;
}

export interface ICatalogDisplayProps {
  catalogProductDisplay: string;
  setCatalogProductDisplay: (display: string) => void;
}

export type TypeQuery = {
  sort?: string;
  search?: string;
  grid?: string;
  categories?: string;
  brands?: string;
  price?: string;
  stock?: string;
};

type TypeFilterCheckbox = { name: string; status: boolean };

export interface ICatalogFilterData {
  result: IResultProduct[] | null;
}

export type TypeFilterMap = {
  name: string;
  count: number;
  available: number;
  key: string;
  status: boolean;
};

export type TypeFilterRange = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  key: string;
};

export type TypeFilterRangeOrNull = TypeFilterRange | null;
export type TypeFilterMapArrayOrNull = TypeFilterMap[] | null;

export interface IFilterData {
  categories: TypeFilterMapArrayOrNull;
  brands: TypeFilterMapArrayOrNull;
  price: TypeFilterRangeOrNull;
  stock: TypeFilterRangeOrNull;
}

export interface IActiveFilterData {
  categories: null | string[];
  brands: null | string[];
  price: null | string[];
  stock: null | string[];
}

export interface ICatalogFilter {
  endFilterData: IFilterData;
  statusFilter: boolean;
  setStatusFilter: (status: boolean) => void;
  setEndFilterData: (data: IFilterData) => void;
}

export interface ICatalogFilterRange {
  data: TypeFilterRange;
  updateInputRange: (data: TypeFilterRange) => void;
  name: string;
}

export interface ICatalogFilterCheckbox {
  data: TypeFilterMap;
  index: number;
  updateInputCheckbox: (
    data: TypeFilterMap,
    name: string,
    index: number,
  ) => void;
  name: string;
}

export interface IUpdateFilterCheckbox {
  type: string;
  list: Map<string, TypeFilterMap>;
}

export interface IPromocode {
  name: string;
  discount: number;
  status: boolean;
  input: boolean;
}

export type UserSubmitForm = {
  fullname: string;
  phonenumber: string;
  email: string;
  address: string;
  cardnumber: number;
  carddate: number;
  cvv: number;
};
