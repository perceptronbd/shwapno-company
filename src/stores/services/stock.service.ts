import { RootState } from "..";
import {
  Stock,
  CreateStock,
  UpdateStock,
  UploadJobResponse,
} from "../states/stock.states";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";
import { ApiResponse } from "@/lib/types/api";

export const stockApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<Stock[], void>({
      query: () => (state: RootState) => ({
        url: `/products/stocks/branch/${state.auth.selectedBranchId}`,
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
      query: (stock) => (state: RootState) => ({
        url: `/products/stocks/branch/${state.auth.selectedBranchId}`,
        method: "PATCH",
        body: stock,
      }),
      invalidatesTags: [TAG_TYPES.STOCK],
    }),
    addStock: builder.mutation<ApiResponse<Stock>, CreateStock>({
      query: (stock) => (state: RootState) => ({
        url: `/products/stocks/branch/${state.auth.selectedBranchId}`,
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
    uploadStockFile: builder.mutation<
      ApiResponse<UploadJobResponse>,
      { data: FormData; branchId: string }
    >({
      query: ({ data, branchId }) => {
        return {
          url: `/products/stocks/upload/branch/${branchId}`,
          method: "POST",
          body: data,
          formData: true,
        };
      },
      invalidatesTags: [TAG_TYPES.STOCK],
    }),

    getUploadJobStatus: builder.query<ApiResponse<UploadJobResponse>, string>({
      query: (jobId) => ({
        url: `/products/stocks/status/${jobId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStocksQuery,
  useDeleteStockMutation,
  useGetStockByIdQuery,
  useAddStockMutation,
  useUpdateStockMutation,
  useUploadStockFileMutation,
  useGetUploadJobStatusQuery,
} = stockApi;
