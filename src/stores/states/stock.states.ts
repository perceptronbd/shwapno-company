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

export interface UploadJobResponse {
  id: string;
  status: string;
  progress: number;
  processed: number;
  total: number;
  errors: string[];
  createdAt: string;
  updatedAt: string;
}
