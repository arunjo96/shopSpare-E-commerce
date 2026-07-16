import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../services/product/productApi";
import { useAddToCartMutation } from "../../services/cart/cartApi";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [addToCart] = useAddToCartMutation();
  
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Product not found
        </h2>
      </div>
    );
  }

const handleAddToCart = async () => {
  try {
    const response = await addToCart({
      productId: product._id,
      quantity: 1,
    }).unwrap();

    toast.success(response?.message || "Product added to cart");
  } catch (error) {
    toast.error(error?.data?.message || "Failed to add to cart");
  }
};


  const product = data?.product;
  

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div>
          <img
            src={
              product?.images?.length
                ? product.images[0].url
                : "https://placehold.co/600x600?text=No+Image"
            }
            alt={product?.title}
            className="h-[500px] w-full rounded-lg border object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product?.title}</h1>

          <p className="text-gray-600">{product?.description}</p>

          <div className="flex items-center gap-3">
            {product?.discountPrice > 0 ? (
              <>
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.discountPrice}
                </span>

                <span className="text-xl text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">₹{product?.price}</span>
            )}
          </div>

          <p>
            <strong>Category:</strong> {product?.category?.name}
          </p>

          <p>
            <strong>Brand:</strong> {product?.brand?.name || "-"}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {product?.averageRating}
          </p>

          <p
            className={
              product?.stock > 0
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="rounded bg-slate-900 px-6 py-3 text-white"
            >
              Add to Cart
            </button>

            <button className="rounded border border-slate-900 px-6 py-3 hover:bg-slate-100">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
