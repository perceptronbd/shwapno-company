export interface Stock {
  id: string;
  branchId: string;
  productId: string;
  quantity: number;
  lowStockAlert: number | null;
  createdAt: string; // or Date if you're handling it as a Date object
  updatedAt: string; // or Date if you're handling it as a Date object
}

export interface StockResponse {
  success: boolean;
  code: number;
  data: Stock[];
  message: string;
}
