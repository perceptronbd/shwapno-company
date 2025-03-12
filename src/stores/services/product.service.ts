import { ApiResponse } from "@/lib/types/api";
import {
  AddProductPayload,
  Category,
  Product,
  UpdateProductPayload,
} from "../states/product.state";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const productApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: ApiResponse<Product[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TAG_TYPES.PRODUCT, id })),
              TAG_TYPES.PRODUCT,
            ]
          : [TAG_TYPES.PRODUCT],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: ApiResponse<Product>) => response.data,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.PRODUCT, id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/products/categories",
      transformResponse: (response: ApiResponse<Category[]>) => response.data,
      providesTags: [TAG_TYPES.CATEGORY],
    }),
    addProduct: builder.mutation<ApiResponse<Product>, AddProductPayload>({
      query: ({ branchId, formData }) => ({
        url: `/products/${branchId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [TAG_TYPES.PRODUCT],
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, UpdateProductPayload>(
      {
        query: ({ id, formData }) => ({
          url: `/products/${id}`,
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: [TAG_TYPES.PRODUCT],
      },
    ),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.PRODUCT, TAG_TYPES.STOCK],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
