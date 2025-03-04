import {
  Order,
  OrderById,
  OrderByIdResponse,
  OrderResponse,
} from "../states/order.state";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const orderApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<OrderByIdResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: TAG_TYPES.ORDER, id }],
    }),

    getOrdersByBranch: builder.query<
      OrderResponse,
      { branchId: string; page?: number; limit?: number }
    >({
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

    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),

    deleteOrder: builder.mutation<{ result: string }, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetOrdersByBranchQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
