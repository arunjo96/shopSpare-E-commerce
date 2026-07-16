import baseApi from "../baseApi";

export const adminProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Admin - Get All Products
    getAdminProducts: builder.query({
      query: () => ({
        url: "/products/admin/all",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Admin - Create Product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Admin - Update Product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Admin - Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminProductApi;
