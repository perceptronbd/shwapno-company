import { COMPANY } from "./constant";

export const LOGIN = "/auth/login";
export const ROOT = "/";

export const ROUTES = {
  ROOT,
  COMPANY,
  LOGIN: `${COMPANY}/login`,
  PROFILE: `${COMPANY}/profile`,
  ORDERS: `${COMPANY}/orders`,
  ORDER_DETAILS: (id: string) => `${COMPANY}/orders/${id}`,
  STOCKS: `${COMPANY}/stocks`,
  ADD_STOCK: `${COMPANY}/stocks/add`,
  STOCK_DETAILS: (id: string) => `${COMPANY}/stocks/${id}`,
  STOCK_EDIT: (id: string) => `${COMPANY}/stocks/edit/${id}`,
  PRODUCTS: `${COMPANY}/products`,
  ADD_PRODUCT: `${COMPANY}/products/add`,
  PRODUCT_DETAILS: (id: string) => `${COMPANY}/products/${id}`,
  PRODUCT_EDIT: (id: string) => `${COMPANY}/products/edit/${id}`,
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN];
