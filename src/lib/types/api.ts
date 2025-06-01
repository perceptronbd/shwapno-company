import { TMeta } from "@/stores/states/meta.state";

export interface ApiResponse<T = unknown> {
  success: true;
  code: number;
  data: T;
  message: string;
  meta: TMeta | null;
}

export interface ApiErrorResponse {
  success: false;
  code: number;
  message: string;
  data?: never;
  meta?: never;
}

export type ApiResponseType<T = unknown> = ApiResponse<T> | ApiErrorResponse;

// Type guard for successful response
export function isApiResponseError(
  response: unknown,
): response is ApiErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    !response.success
  );
}
