import { UserProfile } from "../states/user.state";
import { secureApi } from "./secure.service";
import { ApiResponse } from "@/lib/types/api";

export const userApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/users/profile",
      transformResponse: (response: ApiResponse<UserProfile>) => response.data, // Extract only the `data` field
      providesTags: [{ type: "UserProfile" }],
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
