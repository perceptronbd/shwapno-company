import { Product } from "./product.state";

type status = "PENDING" | "COMPLETED" | "CANCELLED";

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
  status: status;
  customer: Customer;
  items: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  code: number;
  data: {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
}

export interface OrderByIdResponse {
  success: boolean;
  code: number;
  data: {
    id: string;
    customerId: string;
    branchId: string;
    orderDate: string;
    totalAmount: string;
    status: status;
    customer: Customer;
    items: OrderItem[];
    branch: Branch;
  };
  message: string;
}
