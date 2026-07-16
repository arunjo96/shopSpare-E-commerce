import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../services/wishlist/wishlistApi";

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery();

  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const items = data?.wishlist?.items || [];

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id).unwrap();

      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error(error?.data?.message || "Failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="rounded border p-8 text-center">
          <p>Wishlist is empty</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const product = item.product;

            return (
              <div
                key={product._id}
                className="rounded border bg-white p-4 shadow"
              >
                <img
                  src={
                    product.images?.length
                      ? product.images[0].url
                      : "https://placehold.co/300"
                  }
                  className="h-52 w-full rounded object-cover"
                />

                <h2 className="mt-3 font-semibold">{product.title}</h2>

                <p className="mt-2 font-bold">
                  ₹{product.discountPrice || product.price}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/products/${product._id}`}
                    className="
flex-1
rounded
bg-slate-900
py-2
text-center
text-white
"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="
rounded
bg-red-500
px-3
text-white
"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
