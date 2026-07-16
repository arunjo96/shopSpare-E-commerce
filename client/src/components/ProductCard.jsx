
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../services/wishlist/wishlistApi";

const ProductCard = ({ product, wishlistItems = [] }) => {
  const { _id, title, price, discountPrice, images, averageRating, stock } =
    product;

  const [addToWishlist] = useAddToWishlistMutation();

  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isWishlisted = wishlistItems.some((item) => item.product?._id === _id);

 const handleWishlist = async () => {
   try {
     if (isWishlisted) {
       await removeFromWishlist(_id).unwrap();

       toast.success("Removed from wishlist");
     } else {
       await addToWishlist({
         productId: _id,
       }).unwrap();

       toast.success("Added to wishlist ❤️");
     }
   } catch (error) {
     toast.error(error?.data?.message || "Wishlist update failed");
   }
 };

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <Link to={`/products/${_id}`}>
          <img
            src={
              images?.length
                ? images[0].url
                : "https://placehold.co/400x400?text=No+Image"
            }
            alt={title}
            className="h-60 w-full object-cover"
          />
        </Link>

        <button
          onClick={handleWishlist}
          className="
absolute
right-3
top-3
rounded-full
bg-white
p-2
shadow
"
        >
          <FiHeart
            size={20}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
            }
          />
        </button>
      </div>

      <div className="space-y-2 p-4">
        <Link to={`/products/${_id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold hover:text-blue-600">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-3">
          {discountPrice > 0 ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ₹{discountPrice}
              </span>

              <span className="text-sm text-gray-500 line-through">
                ₹{price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">₹{price}</span>
          )}
        </div>

        <p className="text-sm text-yellow-600">⭐ {averageRating || 0}</p>

        <p
          className={`text-sm font-medium ${
            stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <Link
          to={`/products/${_id}`}
          className="
block
rounded
bg-slate-900
py-2
text-center
text-white
transition
hover:bg-slate-800
"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;