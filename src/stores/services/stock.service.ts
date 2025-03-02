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
    deleteStock: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/stocks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.STOCK],
    }),
  }),
});

export const { useGetStocksQuery, useDeleteStockMutation } = stockApi;
