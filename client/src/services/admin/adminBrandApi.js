import baseApi from "../baseApi";

export const adminBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= Get Brands ================= */

    getAdminBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    /* ================= Create Brand ================= */

    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),

    /* ================= Update Brand ================= */

    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),

    /* ================= Delete Brand ================= */

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAdminBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = adminBrandApi;
