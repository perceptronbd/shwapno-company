import { ProfileResponse, UserProfile } from "../states/user.state";
import { secureApi } from "./secure.service";

export const userApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => "/users/profile",
      transformResponse: (response: ProfileResponse) => response.data, // Extract only the `data` field
      providesTags: [{ type: "UserProfile" }],
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
