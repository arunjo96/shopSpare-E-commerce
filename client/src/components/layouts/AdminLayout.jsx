// import { Outlet, NavLink } from "react-router-dom";
// import {
//   FiMenu,
//   FiX,
//   FiHome,
//   FiBox,
//   FiTag,
//   FiShoppingBag,
// } from "react-icons/fi";
// import { useState } from "react";

// const AdminLayout = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navClass = ({ isActive }) =>
//     isActive
//       ? "flex items-center gap-3 rounded bg-slate-800 px-4 py-2 text-white"
//       : "flex items-center gap-3 rounded px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white";

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Mobile Overlay */}

//       {isOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black/40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}

//       <aside
//         className={`
//           fixed
//           left-0
//           top-0
//           z-40
//           h-screen
//           w-64
//           bg-slate-900
//           p-5
//           transition-transform
//           lg:static
//           lg:translate-x-0

//           ${isOpen ? "translate-x-0" : "-translate-x-full"}

//         `}
//       >
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-white">ShopSphere</h1>

//           <button
//             className="text-white lg:hidden"
//             onClick={() => setIsOpen(false)}
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         <nav className="space-y-3">
//           <NavLink
//             to="/admin"
//             end
//             className={navClass}
//             onClick={() => setIsOpen(false)}
//           >
//             <FiHome />
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/admin/products"
//             className={navClass}
//             onClick={() => setIsOpen(false)}
//           >
//             <FiBox />
//             Products
//           </NavLink>

//           <NavLink
//             to="/admin/categories"
//             className={navClass}
//             onClick={() => setIsOpen(false)}
//           >
//             <FiTag />
//             Categories
//           </NavLink>

//           <NavLink
//             to="/admin/brands"
//             className={navClass}
//             onClick={() => setIsOpen(false)}
//           >
//             <FiTag />
//             Brands
//           </NavLink>

//           <NavLink
//             to="/admin/orders"
//             className={navClass}
//             onClick={() => setIsOpen(false)}
//           >
//             <FiShoppingBag />
//             Orders
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}

//       <div className="flex flex-1 flex-col">
//         {/* Header */}

//         <header className="flex items-center justify-between bg-white px-5 py-4 shadow">
//           <button className="lg:hidden" onClick={() => setIsOpen(true)}>
//             <FiMenu size={24} />
//           </button>

//           <h2 className="text-xl font-semibold">Admin Panel</h2>

//           <div className="text-sm text-gray-600">Admin</div>
//         </header>

//         {/* Page Content */}

//         <main className="flex-1 p-5">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBox,
  FiTag,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useLogoutMutation } from "../../services/auth/authApi";
import baseApi from "../../services/baseApi";
import { logout } from "../../store/authSlice";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout());
      dispatch(baseApi.util.resetApiState());

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-3 text-white"
      : "flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">ShopSphere</h1>

          <button
            className="text-white lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            <FiHome size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            <FiBox size={20} />
            Products
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            <FiTag size={20} />
            Categories
          </NavLink>

          <NavLink
            to="/admin/brands"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            <FiTag size={20} />
            Brands
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingBag size={20} />
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow-sm">
          {/* Mobile Menu */}
          <button
            className="text-slate-700 lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-slate-800">
            Admin Dashboard
          </h2>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;