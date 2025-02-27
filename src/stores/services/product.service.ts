import {
  Category,
  CategoryResponse,
  Product,
  ProductResponse,
} from "../states/product.state";
import { secureApi } from "./secure.service";

export const productApi = secureApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: ProductResponse) => response.data,
      providesTags: [{ type: "Product" }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "products/categories",
      transformResponse: (response: CategoryResponse) => response.data,
      providesTags: [{ type: "Category" }],
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productApi;
