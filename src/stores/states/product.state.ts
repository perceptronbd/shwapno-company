export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  imgURL: string | null;
  imgPublicId: string | null;
  description: string;
  price: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  code: number;
  data: Product[];
  message: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  code: number;
  data: Category[]; // Use 'Category[]' instead of 'Category'
  message: string;
}
