import { BRANCH_ID } from "@/utils/constant";
import { Stock, CreateStock, UpdateStock } from "../states/stock.states";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";
import { ApiResponse } from "@/lib/types/api";

export const stockApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<Stock[], void>({
      query: () => ({
        url: `/products/stocks/branch/${BRANCH_ID}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Stock[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: TAG_TYPES.STOCK,
                id,
              })),
              TAG_TYPES.STOCK,
            ]
          : [TAG_TYPES.STOCK],
    }),
    getStockById: builder.query<Stock, string>({
      query: (id) => ({
        url: `/products/stocks/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Stock>) => response.data,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.STOCK, id }],
    }),
    updateStock: builder.mutation<ApiResponse<Stock>, UpdateStock>({
      query: (stock) => ({
        url: `/products/stocks/branch/${BRANCH_ID}`,
        method: "PATCH",
        body: stock,
      }),
      invalidatesTags: [TAG_TYPES.STOCK],
    }),
    addStock: builder.mutation<ApiResponse<Stock>, CreateStock>({
      query: (stock) => ({
        url: `/products/stocks/branch/${BRANCH_ID}`,
        method: "PATCH",
        body: stock,
      }),
      invalidatesTags: [TAG_TYPES.STOCK],
    }),
    deleteStock: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/stocks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.STOCK],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useDeleteStockMutation,
  useGetStockByIdQuery,
  useAddStockMutation,
  useUpdateStockMutation,
} = stockApi;
