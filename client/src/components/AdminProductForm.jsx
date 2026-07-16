
import { useEffect, useState } from "react";
import {  FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../services/admin/adminProductApi";

import { useGetCategoriesQuery } from "../services/category/categoryApi";
import { useGetBrandsQuery } from "../services/brand/brandApi";

const AdminProductForm = ({ product, onClose }) => {
  /* ---------------- APIs ---------------- */

  const { data: categoryData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  /* ---------------- Dropdown Data ---------------- */

  const categories = categoryData?.categories || [];
  const brands = brandData?.brands || [];

  /* ---------------- Form State ---------------- */

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    brand: "",
    featured: false,
    isActive: true,
  });

  /* ---------------- Images ---------------- */
 

  /* ---------------- Edit Mode ---------------- */

  useEffect(() => {
    if (!product) {
      setFormData({
        title: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "",
        category: "",
        brand: "",
        featured: false,
        isActive: true,
      });
   
      return;
    }

    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      stock: product.stock ?? "",
      category: product.category?._id || "",
      brand: product.brand?._id || "",
      featured: product.featured || false,
      isActive: product.isActive ?? true,
    });

   
  }, [product]);

  /* ---------------- Input ---------------- */

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  const remaining = 5 - previewImages.length;

  if (remaining <= 0) {
    toast.error("Maximum 5 images allowed");
    return;
  }

  const selectedFiles = files.slice(0, remaining);

  const newImages = selectedFiles.map((file) => ({
    file,
    url: URL.createObjectURL(file),
    isNew: true,
  }));

  setPreviewImages((prev) => [...prev, ...newImages]);
};


  /* ---------------- Remove Preview ---------------- */


  const isLoading = creating || updating;

  return (
    <form className="space-y-6 p-6" onSubmit={handleSubmit}>


      <div>
        <label className="mb-2 block font-medium">Product Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
          placeholder="Enter Product Title"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
          placeholder="Enter Product Description"
        />
      </div>

      {/* Price */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
            placeholder="0"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Discount Price</label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
            placeholder="0"
          />
        </div>
      </div>

      {/* Stock */}

      <div>
        <label className="mb-2 block font-medium">Stock</label>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
          placeholder="Available Stock"
        />
      </div>

      {/* Category & Brand */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Brand</label>

          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 outline-none focus:border-slate-900"
          >
            <option value="">Select Brand</option>

            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured & Active */}

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>
      </div>

      {/* Submit */}

      <div className="flex justify-end gap-3 border-t pt-5">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border px-6 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {isLoading
            ? "Saving..."
            : product
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );

  /* ---------------- Submit ---------------- */

 async function handleSubmit(e) {
   e.preventDefault();

   if (
     !formData.title.trim() ||
     !formData.description.trim() ||
     !formData.price ||
     !formData.stock ||
     !formData.category
   ) {
     toast.error("Please fill all required fields");
     return;
   }

   try {
     const data = {
       title: formData.title.trim(),
       description: formData.description.trim(),
       price: Number(formData.price),
       discountPrice: Number(formData.discountPrice) || 0,
       stock: Number(formData.stock),
       category: formData.category,
       brand: formData.brand || null,
       featured: formData.featured,
       isActive: formData.isActive,
     };

     if (product) {
       await updateProduct({
         id: product._id,
         formData: data,
       }).unwrap();

       toast.success("Product updated successfully");
     } else {
       await createProduct(data).unwrap();

       toast.success("Product created successfully");
     }

     onClose();
   } catch (error) {
     console.error(error);
     toast.error(error?.data?.message || "Something went wrong");
   }
 }
};

export default AdminProductForm;