import { ST } from "next/dist/shared/lib/utils";

export const LOGIN = "/auth/login";
export const ROOT = "/";

export const COMPANY = "/shawpno";

export const BRANCH_ID = "df5cce60-19a1-40b3-b22a-6d4f5dc694a0";

export const ROUTES = {
  ROOT,
  COMPANY,
  LOGIN: `${COMPANY}/auth/login`,
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

export const PUBLIC_ROUTES = ["/auth/login", "/auth/reset-password"];
