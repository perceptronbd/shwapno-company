import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { TAG_TYPES_LIST } from "../tagTypes";

const baseUrl = process.env.NEXT_PUBLIC_ENDPOINT + "/api/v1";

const baseQuerySecure = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuerySecure(args, api, extraOptions);

  const isUnauthorizedError = result.error?.status === 401;
  const isNotAuthEndpoint =
    api.endpoint !== "login" && api.endpoint !== "logout";

  if (isUnauthorizedError && isNotAuthEndpoint) {
    console.warn("Access token expired, trying refresh...");

    const res = await fetch(baseUrl + "/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    const refreshResult = await res.json();

    if (refreshResult?.data) {
      api.dispatch({
        type: "auth/accessTokenRefresh",
        payload: { accessToken: refreshResult.data },
      });
      return await baseQuerySecure(args, api, extraOptions);
    } else {
      await fetch(baseUrl + "/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      return { error: { status: 401, data: "Unauthorized" } };
    }
  }

  return result;
};

export const secureApi = createApi({
  reducerPath: "secureApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: TAG_TYPES_LIST,
  endpoints: () => ({}),
});
