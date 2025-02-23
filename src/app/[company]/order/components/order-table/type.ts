// file: types.ts
export type OrderStatus = "Pending" | "Delivered" | "Declined" | "Failed";

export interface Order {
  id: string;
  name: string;
  mobile: string;
  status: OrderStatus;
  total: number;
  address: string;
  date: string;
  note?: string;
}
