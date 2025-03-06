import { Product } from "./product.state";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | "DELIVERED"
  | "RETURNED";

interface Branch {
  id: string;
  name: string;
  location: string;
  companyId: string;
  qrURL: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  branchId: string;
  orderDate: string;
  totalAmount: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
}

export interface OrderData {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderById {
  id: string;
  customerId: string;
  branchId: string;
  orderDate: string;
  totalAmount: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  branch: Branch;
}

export interface OrderByBranchQuery {
  branchId: string;
  page: number;
  limit: number;
}

export interface UpdateOrderStatusPayload {
  id: string;
  status: OrderStatus;
}
