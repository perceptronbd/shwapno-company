import { BRANCH_ID } from "@/utils/constants";
import {
  StockResponse,
  Stock,
  StockByIdResponse,
} from "../states/stock.states";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const stockApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<Stock[], void>({
      query: () => ({
        url: `/products/stocks/branch/${BRANCH_ID}`,
        method: "GET",
      }),
      transformResponse: (response: StockResponse) => response.data,
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
      transformResponse: (response: StockByIdResponse) => response.data,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.STOCK, id }],
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
} = stockApi;
