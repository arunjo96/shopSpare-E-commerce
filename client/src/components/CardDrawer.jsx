import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "../services/cart/cartApi";

const CartDrawer = ({ isOpen, onClose }) => {
  const { data, isLoading } = useGetCartQuery(undefined, {
    skip: !isOpen,
  });

  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const items = data?.cart?.items || [];
  const subtotal = data?.cart?.totalAmount || 0;

  const handleQuantity = async (productId, currentQty, change) => {
    const newQty = currentQty + change;

    if (newQty < 1) {
      return;
    }

    try {
      await updateCartItem({
        productId,
        quantity: newQty,
      }).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId).unwrap();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove item");
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>

          <button onClick={onClose} className="rounded p-2 hover:bg-gray-100">
            <FiX size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100vh-200px)] flex-col overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <p>Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-lg font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="rounded bg-slate-900 px-5 py-2 text-white hover:bg-slate-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => {
                const product = item.product;

                return (
                  <div key={product._id} className="flex gap-3 p-4">
                    {/* Product Image */}
                    <img
                      src={
                        product.images?.length
                          ? product.images[0].url
                          : "https://placehold.co/100x100?text=No+Image"
                      }
                      alt={product.title}
                      className="h-20 w-20 rounded border object-cover"
                    />

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <Link
                        to={`/products/${product._id}`}
                        onClick={onClose}
                        className="font-medium hover:text-blue-600"
                      >
                        {product.title}
                      </Link>

                      <p className="mt-1 text-sm font-semibold">
                        ₹{item.price}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantity(product._id, item.quantity, -1)
                            }
                            className="h-8 w-8 rounded border hover:bg-gray-100"
                          >
                            -
                          </button>

                          <span className="min-w-[24px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantity(product._id, item.quantity, 1)
                            }
                            className="h-8 w-8 rounded border hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(product._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t p-5">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block rounded bg-slate-900 py-3 text-center text-white hover:bg-slate-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
