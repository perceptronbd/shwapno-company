import { ApiResponse } from "@/lib/types/api";
import { Branch } from "../states/branch.state";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const branchApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchById: builder.query<Branch, string>({
      query: (branchId) => ({
        url: `/companies/branch/${branchId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Branch>) => response.data,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.BRANCH, id }],
    }),

    createBranchQR: builder.mutation<Branch, string>({
      query: (branchId) => ({
        url: `/companies/branch/${branchId}`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<Branch>) => response.data,
      invalidatesTags: (result, error, id) => [{ type: TAG_TYPES.BRANCH, id }],
    }),
  }),
});

export const { useGetBranchByIdQuery, useCreateBranchQRMutation } = branchApi;
