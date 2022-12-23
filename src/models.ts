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
  addProductsCart: (data: IResultProduct, count: number) => boolean;
  removeProductCart: (id: number, count: number) => boolean;
  isAddCart: (id: number) => boolean;
  setCartCount: React.Dispatch<number>;
  setCartTotal: React.Dispatch<number>;
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
