export interface IResult {
  products: IResultProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IResultProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
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
