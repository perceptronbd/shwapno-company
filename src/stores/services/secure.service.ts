import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { selectAccessToken } from "../slices/auth.slice";
import { RootState } from "..";

// api/baseQuery.ts
let accessToken: string | null = null;

const baseQuerySecure = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // For cookie handling
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuerySecure(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      // Refresh tokens with rememberMe flag
      const refreshResult = await baseQuerySecure(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { rememberMe: localStorage.getItem("rememberMe") === "true" },
        },
        api,
        extraOptions,
      );

      if (refreshResult.meta?.response?.headers.get("Authorization")) {
        // Extract new access token from header
        accessToken =
          refreshResult.meta.response.headers
            .get("Authorization")
            ?.split("Bearer ")[1] || null;

        console.log("New access token:", accessToken);

        // Retry original request
        result = await baseQuerySecure(args, api, extraOptions);
      } else {
        //handle logout
      }
    } catch (error) {
      //handle logout
      console.error("Error refreshing access token:", error);
    }
  }
  return result;
};

export const secureApi = createApi({
  reducerPath: "secureApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
