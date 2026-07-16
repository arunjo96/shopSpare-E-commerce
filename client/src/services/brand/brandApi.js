import baseApi from "../baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
