import { ApiResponse } from "@/lib/types/api";
import {
  Order,
  OrderByBranchQuery as Query,
  OrderData,
  UpdateOrderStatusPayload as Status,
} from "../states/order.state";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const orderApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: TAG_TYPES.ORDER, id }],
    }),

    getOrdersByBranch: builder.query<ApiResponse<OrderData>, Query>({
      query: ({ branchId, page = 1, limit = 10 }) => ({
        url: `/orders/branch/${branchId}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.orders.map(({ id }) => ({
                type: TAG_TYPES.ORDER,
                id,
              })),
              TAG_TYPES.ORDER,
            ]
          : [TAG_TYPES.ORDER],
    }),

    updateOrderStatus: builder.mutation<ApiResponse<Order>, Status>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_TYPES.ORDER, id },
      ],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: TAG_TYPES.ORDER, id }],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersByBranchQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
