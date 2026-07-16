// import { useState } from "react";
// import ProductCard from "../../components/ProductCard";
// import { useGetCategoriesQuery } from "../../services/category/categoryApi";
// import { useGetBrandsQuery } from "../../services/brand/brandApi";
// import { useGetProductsQuery } from "../../services/product/productApi";

// const Products = () => {
// const [filters, setFilters] = useState({
//   search: "",
//   category: "",
//   brand: "",
//   sort: "",
//   page: 1,
//   limit: 10,
// });

//   const { data: categoryData } = useGetCategoriesQuery();

//   const { data: brandData } = useGetBrandsQuery();

//   const { data, isLoading, isError } = useGetProductsQuery(filters);

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//       page: 1,
//     });
//   };

//   if (isLoading) {
//     return <div className="flex justify-center py-20">Loading...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="flex justify-center py-20 text-red-500">
//         Failed to load products
//       </div>
//     );
//   }

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-8">
//       <h1 className="mb-6 text-3xl font-bold">Products</h1>

//       {/* Filters */}

//       <div className="mb-8 grid gap-4 md:grid-cols-3">
//         <input
//           type="text"
//           name="search"
//           placeholder="Search products..."
//           value={filters.search}
//           onChange={handleChange}
//           className="rounded border p-3"
//         />

//         <select
//           name="sort"
//           value={filters.sort}
//           onChange={handleChange}
//           className="rounded border p-3"
//         >
//           <option value="">Sort By</option>

//           <option value="priceLow">Price Low to High</option>

//           <option value="priceHigh">Price High to Low</option>

//           <option value="rating">Rating</option>

//           <option value="oldest">Oldest</option>
//         </select>

//         <select
//           name="category"
//           value={filters.category}
//           onChange={handleChange}
//           className="rounded border p-3"
//         >
//           <option value="">All Categories</option>

//           {categoryData?.categories?.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="brand"
//           value={filters.brand}
//           onChange={handleChange}
//           className="rounded border p-3"
//         >
//           <option value="">All Brands</option>

//           {brandData?.brands?.map((brand) => (
//             <option key={brand._id} value={brand._id}>
//               {brand.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Products */}

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {data?.products?.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Products;

import { useState } from "react";
import ProductCard from "../../components/ProductCard";

import { useGetCategoriesQuery } from "../../services/category/categoryApi";
import { useGetBrandsQuery } from "../../services/brand/brandApi";
import { useGetProductsQuery } from "../../services/product/productApi";
import { useGetWishlistQuery } from "../../services/wishlist/wishlistApi";
const Products = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    brand: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const { data: categoryData } = useGetCategoriesQuery();
  const { data: brandData } = useGetBrandsQuery();

  const { data, isLoading, isError } = useGetProductsQuery(filters);
  const { data: wishlistData } = useGetWishlistQuery();
  const wishlistItems = wishlistData?.wishlist?.items || [];
  const handleCategory = (id) => {
    setFilters({
      ...filters,
      category: id === filters.category ? "" : id,
      page: 1,
    });
  };

  const handleBrand = (id) => {
    setFilters({
      ...filters,
      brand: id === filters.brand ? "" : id,
      page: 1,
    });
  };

  const handleSort = (e) => {
    setFilters({
      ...filters,
      sort: e.target.value,
      page: 1,
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center py-20 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6">
        {/* Sidebar */}

        <aside className="col-span-12 md:col-span-3 bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-6">Filters</h2>

          {/* Category */}

          <div className="border-b pb-5">
            <h3 className="font-semibold mb-4">Category</h3>

            <div className="space-y-3">
              {categoryData?.categories?.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.category === category._id}
                    onChange={() => handleCategory(category._id)}
                    className="w-4 h-4 accent-black"
                  />

                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}

          <div className="pt-5">
            <h3 className="font-semibold mb-4">Brand</h3>

            <div className="space-y-3">
              {brandData?.brands?.map((brand) => (
                <label
                  key={brand._id}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.brand === brand._id}
                    onChange={() => handleBrand(brand._id)}
                    className="w-4 h-4 accent-black"
                  />

                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Area */}

        <div className="col-span-12 md:col-span-9">
          {/* Header */}

          <div className="bg-white border rounded-xl px-6 py-5 mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">All Products</h1>

            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                {data?.products?.length || 0} Products
              </span>

              <select
                value={filters.sort}
                onChange={handleSort}
                className="border rounded-lg px-4 py-2 outline-none"
              >
                <option value="">Sort By</option>

                <option value="priceLow">Price Low to High</option>

                <option value="priceHigh">Price High to Low</option>

                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlistItems={wishlistItems}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;