import { Product } from "./product.state";

export interface Stock {
  id: string;
  branchId: string;
  productId: string;
  quantity: number;
  lowStockAlert: number | null;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface StockResponse {
  success: boolean;
  code: number;
  data: Stock[];
  message: string;
}

export interface StockByIdResponse {
  success: boolean;
  code: number;
  data: Stock;
  message: string;
}
