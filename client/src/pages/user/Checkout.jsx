// import { useState } from "react";
// import { useGetCartQuery } from "../../services/cart/cartApi";
// import { useCreateRazorpayOrderMutation } from "../../services/payment/paymentApi";
// import { useVerifyPaymentMutation } from "../../services/payment/paymentApi";
// import { useCreateOrderMutation } from "../../services/order/orderApi";
// import { useClearCartMutation } from "../../services/cart/cartApi";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// import { useGetCartQuery } from "../../services/cart/cartApi";

// import {
//   useCreateRazorpayOrderMutation,
//   useVerifyPaymentMutation,
// } from "../../services/payment/paymentApi";

// import { useCreateOrderMutation } from "../../services/order/orderApi";

// const Checkout = () => {
//   const { data, isLoading } = useGetCartQuery();

//   const navigate = useNavigate();

//   const items = data?.cart?.items || [];
//   const subtotal = data?.cart?.totalAmount || 0;

//  const [formData, setFormData] = useState({
//    fullName: "",
//    phone: "",
//    addressLine1: "",
//    addressLine2: "",
//    landmark: "",
//    city: "",
//    state: "",
//    country: "India",
//    postalCode: "",
//  });

//   const [createOrder] = useCreateOrderMutation();

//   const [createRazorpayOrder] = useCreateRazorpayOrderMutation();

//   const [verifyPayment] = useVerifyPaymentMutation();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) return resolve(true);

//       const script = document.createElement("script");

//       script.src = "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => resolve(true);

//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//  const handleCheckout = async () => {
//    try {
//      if (items.length === 0) {
//        return toast.error("Cart is empty");
//      }

//      const loaded = await loadRazorpay();

//      if (!loaded) {
//        return toast.error("Failed to load Razorpay");
//      }

//      const orderRes = await createOrder({
//        shippingAddress: formData,
//        paymentMethod: "RAZORPAY",
//      }).unwrap();

//      const payment = await createRazorpayOrder({
//        orderId: orderRes.order._id,
//      }).unwrap();

//      const options = {
//        key: payment.key,

//        amount: payment.amount,

//        currency: payment.currency,

//        order_id: payment.razorpayOrderId,

//        name: "ShopSphere",

//        description: "Order Payment",

//        handler: async (response) => {
//          try {
//            await verifyPayment({
//              orderId: payment.orderId,

//              razorpay_order_id: response.razorpay_order_id,

//              razorpay_payment_id: response.razorpay_payment_id,

//              razorpay_signature: response.razorpay_signature,
//            }).unwrap();

//            toast.success("Payment Successful");

//            navigate("/orders");
//          } catch (error) {
//            toast.error(error?.data?.message || "Payment verification failed");
//          }
//        },

//        theme: {
//          color: "#0f172a",
//        },
//      };

//      const razorpay = new window.Razorpay(options);

//      razorpay.open();
//    } catch (error) {
//      toast.error(error?.data?.message || "Checkout failed");
//    }
//  };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <p className="text-lg font-medium">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-10">
//       <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

//       <div className="grid gap-8 lg:grid-cols-2">
//         {/* Shipping Address */}

//         <div className="rounded-lg border bg-white p-6 shadow-sm">
//           <h2 className="mb-5 text-xl font-semibold">Shipping Address</h2>

//           <div className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <textarea
//               rows="4"
//               name="addressLine1"
//               placeholder="addressLine1"
//               value={formData.addressLine1}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="addressLine2"
//               placeholder="Address Line 2"
//               value={formData.addressLine2}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="landmark"
//               placeholder="Landmark"
//               value={formData.landmark}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />

//             <input
//               type="text"
//               name="postalCode"
//               placeholder="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="w-full rounded border p-3 outline-none focus:border-slate-900"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}

//         <div className="rounded-lg border bg-white p-6 shadow-sm">
//           <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

//           {items.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             <>
//               <div className="space-y-5">
//                 {items.map((item) => (
//                   <div
//                     key={item.product._id}
//                     className="flex items-center gap-4 border-b pb-4"
//                   >
//                     <img
//                       src={
//                         item.product.images?.length
//                           ? item.product.images[0].url
//                           : "https://placehold.co/80x80"
//                       }
//                       alt={item.product.title}
//                       className="h-16 w-16 rounded border object-cover"
//                     />

//                     <div className="flex-1">
//                       <h3 className="font-medium">{item.product.title}</h3>

//                       <p className="text-sm text-gray-500">
//                         Qty : {item.quantity}
//                       </p>
//                     </div>

//                     <p className="font-semibold">
//                       ₹{(item.price * item.quantity).toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 border-t pt-5">
//                 <div className="mb-2 flex justify-between">
//                   <span>Subtotal</span>

//                   <span>₹{subtotal.toLocaleString("en-IN")}</span>
//                 </div>

//                 <div className="mb-2 flex justify-between">
//                   <span>Shipping</span>

//                   <span className="text-green-600">Free</span>
//                 </div>

//                 <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
//                   <span>Total</span>

//                   <span>₹{subtotal.toLocaleString("en-IN")}</span>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="mt-6 w-full rounded bg-slate-900 py-3 text-white transition hover:bg-slate-800"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Checkout;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useGetCartQuery } from "../../services/cart/cartApi";

import {
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} from "../../services/payment/paymentApi";

import { useCreateOrderMutation } from "../../services/order/orderApi";

const Checkout = () => {
  const { data, isLoading } = useGetCartQuery();

  const navigate = useNavigate();

  const items = data?.cart?.items || [];
  const subtotal = data?.cart?.totalAmount || 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "India",
    },
  });

  const [createOrder] = useCreateOrderMutation();

  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();

  const [verifyPayment] = useVerifyPaymentMutation();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        return resolve(true);
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (formData) => {
    try {
      if (items.length === 0) {
        return toast.error("Cart is empty");
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        return toast.error("Failed to load Razorpay");
      }

      // Create Mongo Order

      const orderRes = await createOrder({
        shippingAddress: formData,

        paymentMethod: "RAZORPAY",
      }).unwrap();

      // Create Razorpay Order

      const payment = await createRazorpayOrder({
        orderId: orderRes.order._id,
      }).unwrap();

      const options = {
        key: payment.key,

        amount: payment.amount,

        currency: payment.currency,

        order_id: payment.razorpayOrderId,

        name: "ShopSphere",

        description: "Order Payment",

        handler: async (response) => {
          try {
            await verifyPayment({
              orderId: payment.orderId,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            toast.success("Payment Successful");

            navigate("/orders");
          } catch (error) {
            toast.error(error?.data?.message || "Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
          },
        },

        theme: {
          color: "#0f172a",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error(error?.data?.message || "Checkout failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* SHIPPING FORM */}

        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-semibold">Shipping Address</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full rounded border p-3"
            />

            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}

            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",

                minLength: {
                  value: 10,
                  message: "Enter valid phone number",
                },
              })}
              className="w-full rounded border p-3"
            />

            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}

            <textarea
              rows="4"
              placeholder="Address"
              {...register("address", {
                required: "Address is required",
              })}
              className="w-full rounded border p-3"
            />

            {errors.address && (
              <p className="text-sm text-red-500">
                {errors.address.message}
              </p>
            )}


            <input
              type="text"
              placeholder="Landmark"
              {...register("landmark")}
              className="w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="Country"
              {...register("country")}
              className="w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="City"
              {...register("city", {
                required: "City is required",
              })}
              className="w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="State"
              {...register("state", {
                required: "State is required",
              })}
              className="w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
              className="w-full rounded border p-3"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded bg-slate-900 py-3 text-white"
            >
              Proceed to Payment
            </button>
          </div>
        </form>

        {/* ORDER SUMMARY */}

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-4 border-b pb-4 mb-4"
            >
              <img
                src={
                  item.product.images?.length
                    ? item.product.images[0].url
                    : "https://placehold.co/80x80"
                }
                alt={item.product.title}
                className="h-16 w-16 rounded border object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.product.title}</h3>

                <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}

          <div className="mt-6 border-t pt-5 flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;