import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useGetAdminCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../services/admin/adminCategoryApi";

import CategoryForm from "../../components/CategoryForm";

const Categories = () => {
  const { data, isLoading } = useGetAdminCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.categories || [];

  const [search, setSearch] = useState("");

  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id).unwrap();

      toast.success("Category deleted successfully");
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
            <h1 className="text-3xl font-bold">Categories</h1>

            <p className="text-gray-500">Manage all product categories</p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowDrawer(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
          >
            <FiPlus />
            Add Category
          </button>
        </div>

        {/* Search */}

        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-slate-900"
          />
        </div>

        {/* Cards */}

        {filteredCategories.length === 0 ? (
          <div className="rounded-xl border bg-white py-20 text-center text-gray-500">
            No Categories Found
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold">{category.name}</h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Slug : {category.slug}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDrawer(true);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-500 py-2 text-blue-600 hover:bg-blue-50"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(category._id)}
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

      {/* Right Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-lg overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold">
            {selectedCategory ? "Edit Category" : "Add Category"}
          </h2>

          <button onClick={() => setShowDrawer(false)}>
            <FiX size={24} />
          </button>
        </div>

        <CategoryForm
          category={selectedCategory}
          onClose={() => setShowDrawer(false)}
        />
      </div>

      {/* Overlay */}

      {showDrawer && (
        <div
          onClick={() => setShowDrawer(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}
    </>
  );
};

export default Categories;
