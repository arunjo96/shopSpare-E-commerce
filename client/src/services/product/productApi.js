// import baseApi  from "../baseApi";

// export const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: () => ({
//         url: "/products",
//         method: "GET",
//       }),
//       providesTags: ["Product"],
//     }),

//     // getSingleProduct: builder.query({
//     //   query: (id) => ({
//     //     url: `/products/${id}`,
//     //     method: "GET",
//     //   }),
//     //   providesTags: ["Product"],
//     // }),

//     getSingleProduct: builder.query({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, id) => [
//         {
//           type: "Product",
//           id,
//         },
//       ],
//     }),
//   }),
// });

// export const { useGetProductsQuery, useGetSingleProductQuery } = productApi;

import baseApi from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productApi;