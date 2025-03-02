import {
  Category,
  CategoryResponse,
  Product,
  ProductResponse,
  ProductsResponse,
} from "../states/product.state";
import { TAG_TYPES } from "../tagTypes";
import { secureApi } from "./secure.service";

export const productApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: ProductsResponse) => response.data,
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
      transformResponse: (response: ProductResponse) => response.data,
      providesTags: (result, error, id) => [{ type: TAG_TYPES.PRODUCT, id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/products/categories",
      transformResponse: (response: CategoryResponse) => response.data,
      providesTags: [TAG_TYPES.CATEGORY],
    }),
    addProduct: builder.mutation<
      void,
      { branchId: string; formData: FormData }
    >({
      query: ({ branchId, formData }) => ({
        url: `/products/${branchId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [TAG_TYPES.PRODUCT],
    }),
    updateProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: [TAG_TYPES.PRODUCT],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TYPES.PRODUCT],
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
