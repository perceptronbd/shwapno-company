import { StockResponse } from "../states/stock.states";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const stockApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<StockResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/products/stocks",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.stocks.map(({ id }) => ({
                type: TAG_TYPES.STOCK,
                id,
              })),
              TAG_TYPES.STOCK,
            ]
          : [TAG_TYPES.STOCK],
    }),
  }),
  // getProductById: builder.query<Product, string>({
  //   query: (id) => `/products/${id}`,
  //   transformResponse: (response: ProductResponse) => response.data,
  //   providesTags: (result, error, id) => [{ type: TAG_TYPES.PRODUCT, id }],
  // }),
  // getCategories: builder.query<Category[], void>({
  //   query: () => "/products/categories",
  //   transformResponse: (response: CategoryResponse) => response.data,
  //   providesTags: [TAG_TYPES.CATEGORY],
  // }),
  // addProduct: builder.mutation<
  //   void,
  //   { branchId: string; formData: FormData }
  // >({
  //   query: ({ branchId, formData }) => ({
  //     url: `/products/${branchId}`,
  //     method: "POST",
  //     body: formData,
  //   }),
  //   invalidatesTags: [TAG_TYPES.PRODUCT],
  // }),
  // updateProduct: builder.mutation<void, Product>({
  //   query: (product) => ({
  //     url: `/products/${product.id}`,
  //     method: "PATCH",
  //     body: product,
  //   }),
  //   invalidatesTags: [TAG_TYPES.PRODUCT],
  // }),
  // deleteProduct: builder.mutation<void, string>({
  //   query: (productId) => ({
  //     url: `/products/${productId}`,
  //     method: "DELETE",
  //   }),
  //   invalidatesTags: [TAG_TYPES.PRODUCT],
  // }),
});

export const { useGetStocksQuery } = stockApi;
