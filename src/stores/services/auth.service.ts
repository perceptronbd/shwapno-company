import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { AuthState, LoginRequest, User } from "../states/auth.state";
import { secureApi } from "./secure.service";
import { ApiResponse } from "@/lib/types/api";

export const authApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (
        response: ApiResponse<User>,
        meta: FetchBaseQueryMeta | undefined,
      ): AuthState => {
        const authHeader = meta?.response?.headers.get("authorization") || "";

        const accessToken = authHeader.replace(/^Bearer\s+/i, "");
        return { user: response.data, accessToken };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refreshTokens: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokensMutation } =
  authApi;
