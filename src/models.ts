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

export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

export interface ISearchContext {
  searchValue: string;
  setSerachValue: React.Dispatch<string>;
}

export interface ICartContext {
  getLocalStorage: (value: string) => [] | TypeCartItem[];
  setLocalStorage: <T>(key: string, value: T) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  addProductsCart: (data: IResultProduct, count: number) => boolean;
  removeProductCart: (id: number, count: number) => boolean;
  isAddCart: (id: number) => boolean;
  updateCartCountAndSumm: () => void;
  cartCount: number;
  cartTotal: number;
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
  setResult: (result: T) => void;
};
