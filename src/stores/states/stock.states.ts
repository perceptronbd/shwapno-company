import { Product } from "./product.state";

interface Branch {
  name: string;
  location: string;
}

export interface Stock {
  id: string;
  branchId: string;
  productId: string;
  quantity: number;
  lowStockAlert: number | null;
  createdAt: string;
  updatedAt: string;
  product: Product;
  branch: Branch;
}

export interface StockResponse {
  success: boolean;
  code: number;
  data: {
    stocks: Stock[];
    pagination: {
      total: number;
      pages: number;
      currentPage: number;
      limit: number;
    };
  };
  message: string;
}
