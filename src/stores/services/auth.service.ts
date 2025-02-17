import { AuthResponse, LoginRequest } from "../states/auth.state";
import { secureApi } from "./secure.service";

export const authApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: () => ({
        url: "/auth/login",
        method: "POST",
      }),
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
