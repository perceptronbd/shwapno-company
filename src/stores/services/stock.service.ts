import { BRANCH_ID } from "@/utils/constants";
import { StockResponse } from "../states/stock.states";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const stockApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<StockResponse, void>({
      query: () => ({
        url: `/products/stocks/branch/${BRANCH_ID}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
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
