import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useGetAdminProductsQuery,
  useDeleteProductMutation,
} from "../../services/admin/adminProductApi";

import ProductForm from "../../components/AdminProductForm";

const AdminProducts = () => {
  // const { data, isLoading } = useGetAdminProductsQuery();

  const { data, isLoading, refetch } = useGetAdminProductsQuery();
  
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id).unwrap();

      toast.success("Product deleted");
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
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
    <>
      <section className="space-y-6">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>

            <p className="text-gray-500">Manage all products</p>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
          >
            <FiPlus />
            Add Product
          </button>
        </div>

        {/* Search */}

        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-3 pl-10 pr-4 focus:border-slate-900 focus:outline-none"
          />
        </div>

        {/* Cards */}

        {filteredProducts.length === 0 ? (
          <div className="rounded-lg border bg-white py-20 text-center text-gray-500">
            No Products Found
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}

                <img
                  src={
                    product.images?.length
                      ? product.images[0].url
                      : "https://placehold.co/600x400"
                  }
                  alt={product.title}
                  className="h-56 w-full object-cover"
                />

                {/* Body */}

                <div className="space-y-3 p-5">
                  <h2 className="line-clamp-2 text-lg font-semibold">
                    {product.title}
                  </h2>

                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Category :</span>{" "}
                      {product.category?.name || "-"}
                    </p>

                    <p>
                      <span className="font-medium">Brand :</span>{" "}
                      {product.brand?.name || "-"}
                    </p>

                    <p>
                      <span className="font-medium">Stock :</span>{" "}
                      {product.stock}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.discountPrice || product.price}
                    </span>

                    {product.discountPrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {product.isActive ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        Inactive
                      </span>
                    )}

                    {product.featured && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowForm(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-500 py-2 text-blue-600 hover:bg-blue-50"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 py-2 text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Right Toggle Panel */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-2xl overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          showForm ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          >
            <FiX size={24} />
          </button>
        </div>

        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
            refetch();
          }}
        />
      </div>

      {showForm && (
        <div
          onClick={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}
    </>
  );
};

export default AdminProducts;
