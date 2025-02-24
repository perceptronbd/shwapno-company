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
