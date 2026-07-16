import { toast } from "react-hot-toast";

import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "../../services/order/orderApi";

const Orders = () => {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  const [cancelOrder] = useCancelOrderMutation();

  const orders = data?.orders || [];

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId).unwrap();

      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Unable to cancel order");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p>Failed to load orders</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded border bg-white p-8 text-center shadow-sm">
          <p className="text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              {/* Header */}

              <div className="mb-5 flex flex-wrap justify-between gap-4 border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>

                  <p className="font-medium">{order._id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date</p>

                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total</p>

                  <p className="font-bold">₹{order.totalPrice}</p>
                </div>
              </div>

              {/* Status */}

              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {order.orderStatus}
                </span>

                <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                  {order.paymentStatus}
                </span>

                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  {order.paymentMethod}
                </span>
              </div>

              {/* Products */}

              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.image || "https://placehold.co/100"}
                      alt={item.title}
                      className="h-20 w-20 rounded border object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>

                      <p className="font-medium">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}

              <div className="mt-5 flex justify-end">
                {(order.orderStatus === "Pending" ||
                  order.orderStatus === "Confirmed") && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
