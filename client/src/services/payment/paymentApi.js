import baseApi from "../baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation({
      query: (data) => ({
        url: "/payment/create-order",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
  }),
});

export const { useCreateRazorpayOrderMutation, useVerifyPaymentMutation } =
  paymentApi;
