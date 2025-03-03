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

export interface CreateStock {
  quantity: Stock["quantity"];
  productId: Stock["productId"];
}

export interface UpdateStock {
  quantity?: Stock["quantity"] | null;
  productId?: Stock["productId"] | null;
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
