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
}

export interface ICartContext {
  getLocalStorage: (value: string) => [] | TypeCartItem[];
  setLocalStorage: <T>(key: string, value: T) => void;
  getCartTotal: () => number;
  getCartDiscountTotal: () => number;
  getCartCount: () => number;
  addProductsCart: (data: IResultProduct, count: number) => boolean;
  removeProductCart: (id: number, count: number) => boolean;
  isAddCart: (id: number) => boolean;
  updateCartCountAndSumm: () => void;
  cartCount: number;
  cartTotal: number;
  handleModalStatus: () => void;
}

type TypeItem = Omit<
  IResultProduct,
  'brand' | 'stock' | 'rating' | 'description' | 'images' | 'category'
>;

type TypeCount = {
  count: number;
};

export type TypeCartItem = TypeItem & TypeCount;

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
  count: number;
  available: number;
  key: string;
};

export interface IFilterData {
  categories: TypeFilterMap[] | null;
  brands: TypeFilterMap[] | null;
  price: TypeFilterRange | null;
  stock: TypeFilterRange | null;
}

export interface IActiveFilterData {
  categories: null | string[];
  brands: null | string[];
  price: null | string[];
  stock: null | string[];
}
