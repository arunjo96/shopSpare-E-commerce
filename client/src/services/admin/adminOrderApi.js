import baseApi from "../baseApi";

export const adminOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= Get All Orders ================= */

    getAdminOrders: builder.query({
      query: () => ({
        url: "/orders/admin/all",
        method: "GET",
      }),
      providesTags: ["AdminOrder"],
    }),

    /* ================= Get Single Order ================= */

    getAdminOrderById: builder.query({
      query: (orderId) => ({
        url: `/orders/admin/${orderId}`,
        method: "GET",
      }),
      providesTags: ["AdminOrder"],
    }),

    /* ================= Update Order Status ================= */

    updateOrderStatus: builder.mutation({
      query: ({ orderId, orderStatus }) => ({
        url: `/orders/admin/status/${orderId}`,
        method: "PUT",
        body: {
          orderStatus,
        },
      }),
      invalidatesTags: ["AdminOrder"],
    }),
  }),
});

export const {
  useGetAdminOrdersQuery,
  useGetAdminOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = adminOrderApi;
