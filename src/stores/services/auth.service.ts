import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { AuthResponse, AuthState, LoginRequest } from "../states/auth.state";
import { secureApi } from "./secure.service";

export const authApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: AuthResponse,
        meta: FetchBaseQueryMeta | undefined,
      ): AuthState => {
        console.log("Meta Response", response);
        const authHeader = meta?.response?.headers.get("Authorization");
        const accessToken = authHeader?.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : "";

        console.log("Access Token:", accessToken);

        if (!accessToken) {
          console.warn(
            "Authorization header missing or invalid in login response",
          );
        }

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
