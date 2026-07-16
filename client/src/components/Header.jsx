// import { Link, NavLink } from "react-router-dom";
// import { FiHeart, FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store/authSlice";
// import { useLogoutMutation } from "../services/auth/authApi";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-blue-600 font-semibold"
//       : "text-gray-700 hover:text-blue-600 transition";

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-slate-900">
//           ShopSphere
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden items-center gap-6 md:flex">
//           <NavLink to="/" className={navLinkClass}>
//             Home
//           </NavLink>

//           <NavLink to="/products" className={navLinkClass}>
//             Products
//           </NavLink>

//           <NavLink to="/wishlist" className={navLinkClass}>
//             <FiHeart size={20} />
//           </NavLink>

//           <NavLink to="/cart" className={navLinkClass}>
//             <FiShoppingCart size={20} />
//           </NavLink>

//           <NavLink to="/login" className={navLinkClass}>
//             <FiUser size={20} />
//           </NavLink>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <nav className="space-y-3 border-t bg-white px-4 py-4 md:hidden">
//           <NavLink
//             to="/"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/products"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Products
//           </NavLink>

//           <NavLink
//             to="/wishlist"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Wishlist
//           </NavLink>

//           <NavLink
//             to="/cart"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Cart
//           </NavLink>

//           <NavLink
//             to="/login"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </NavLink>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

// import { Link, NavLink } from "react-router-dom";
// import {
//   FiHeart,
//   FiMenu,
//   FiShoppingCart,
//   FiUser,
//   FiX,
//   FiChevronDown,
// } from "react-icons/fi";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import baseApi from "../services/baseApi";
// import { logout } from "../store/authSlice";
// import { useLogoutMutation } from "../services/auth/authApi";

// import CartDrawer from "./CardDrawer";
// import { useGetCartQuery } from "../services/cart/cartApi";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const dispatch = useDispatch();

//   const { user, isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   const [logoutApi] = useLogoutMutation();

//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const { data } = useGetCartQuery(undefined, {
//     skip: !isAuthenticated,
//   });

//  const cartCount = isAuthenticated ? data?.cart?.totalItems || 0 : 0;

// const handleLogout = async () => {
//   try {
//     await logoutApi().unwrap();

//     dispatch(logout());

//     dispatch(baseApi.util.resetApiState());

//     setProfileOpen(false);
//     setIsCartOpen(false);
//   } catch (error) {
//     console.log(error);
//   }
// };

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-blue-600 font-semibold"
//       : "text-gray-700 hover:text-blue-600 transition";

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-slate-900">
//           ShopSphere
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden items-center gap-6 md:flex">
//           <NavLink to="/" className={navLinkClass}>
//             Home
//           </NavLink>

//           <NavLink to="/products" className={navLinkClass}>
//             Products
//           </NavLink>

//           <NavLink to="/wishlist" className={navLinkClass}>
//             <FiHeart size={20} />
//           </NavLink>

//           <div className="relative">
//             <button onClick={() => setIsCartOpen(true)} className="relative">
//               <FiShoppingCart size={22} />

//               {cartCount > 0 && (
//                 <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                   {cartCount}
//                 </span>
//               )}
//             </button>

//             <CartDrawer
//               isOpen={isCartOpen}
//               onClose={() => setIsCartOpen(false)}
//             />
//             {/* <FiShoppingCart size={20}/> */}
//           </div>

//           {isAuthenticated ? (
//             <div className="relative">
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
//               >
//                 <FiUser size={20} />

//                 <span>{user?.name}</span>

//                 <FiChevronDown size={16} />
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-3 w-48 rounded-lg border bg-white shadow-lg">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-3 hover:bg-gray-100"
//                   >
//                     Profile
//                   </Link>

//                   <Link
//                     to="/orders"
//                     className="block px-4 py-3 hover:bg-gray-100"
//                   >
//                     Orders
//                   </Link>

//                   <Link
//                     to="/wishlist"
//                     className="block px-4 py-3 hover:bg-gray-100"
//                   >
//                     Wishlist
//                   </Link>

//                   <button
//                     onClick={handleLogout}
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <NavLink to="/login" className={navLinkClass}>
//               <FiUser size={20} />
//             </NavLink>
//           )}
//         </nav>

//         {/* Mobile Button */}
//         <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}

//       {isOpen && (
//         <nav className="space-y-3 border-t bg-white px-4 py-4 md:hidden">
//           <NavLink
//             to="/"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/products"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Products
//           </NavLink>

//           <NavLink
//             to="/wishlist"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Wishlist
//           </NavLink>

//           <NavLink
//             to="/cart"
//             className={navLinkClass}
//             onClick={() => setIsOpen(false)}
//           >
//             Cart
//           </NavLink>

//           {isAuthenticated ? (
//             <>
//               <NavLink
//                 to="/orders"
//                 className={navLinkClass}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Orders
//               </NavLink>

//               <NavLink
//                 to="/profile"
//                 className={navLinkClass}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Profile
//               </NavLink>

//               <button
//                 onClick={handleLogout}
//                 className="text-left text-gray-700 hover:text-blue-600"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <NavLink
//               to="/login"
//               className={navLinkClass}
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </NavLink>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import { Link, NavLink } from "react-router-dom";
import {
  FiHeart,
  FiMenu,
  FiShoppingCart,
  FiUser,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import baseApi from "../services/baseApi";
import { logout } from "../store/authSlice";
import { useLogoutMutation } from "../services/auth/authApi";

import CartDrawer from "./CardDrawer";
import { useGetCartQuery } from "../services/cart/cartApi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [logoutApi] = useLogoutMutation();

  const { data } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const cartCount = isAuthenticated ? data?.cart?.totalItems || 0 : 0;

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();

      dispatch(logout());

      dispatch(baseApi.util.resetApiState());

      setProfileOpen(false);
      setIsCartOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}

        <Link to="/" className="text-xl sm:text-2xl font-bold text-slate-900">
          ShopSphere
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/wishlist" className={navLinkClass}>
            <FiHeart size={21} />
          </NavLink>

          {/* Cart */}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-gray-700 hover:text-blue-600"
          >
            <FiShoppingCart size={22} />

            {cartCount > 0 && (
              <span
                className="
absolute -right-2 -top-2
flex h-5 w-5
items-center justify-center
rounded-full
bg-red-500
text-xs text-white
"
              >
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
flex items-center gap-2
text-gray-700
hover:text-blue-600
"
              >
                <FiUser size={20} />

                <span className="max-w-[120px] truncate">{user?.name}</span>

                <FiChevronDown size={16} />
              </button>

              {profileOpen && (
                <div
                  className="
absolute right-0 mt-3
w-48
rounded-lg
border
bg-white
shadow-xl
overflow-hidden
"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
w-full px-4 py-3
text-left
hover:bg-gray-100
"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              <FiUser size={21} />
            </NavLink>
          )}
        </nav>

        {/* Mobile Icons */}

        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <FiShoppingCart size={22} />

            {cartCount > 0 && (
              <span
                className="
absolute -right-2 -top-2
h-5 w-5
rounded-full
bg-red-500
text-xs
text-white
flex items-center justify-center
"
              >
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Cart Drawer */}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu */}

      {isOpen && (
        <nav
          className="
md:hidden
border-t
bg-white
px-5
py-5
space-y-4
"
        >
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Wishlist
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/orders"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Orders
              </NavLink>

              <NavLink
                to="/profile"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="
text-gray-700
hover:text-blue-600
"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;