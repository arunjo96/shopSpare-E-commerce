import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex items-center justify-center bg-slate-900 text-white p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">ShopSphere</h1>

          <p className="text-lg text-slate-300">
            Discover the latest products, shop securely, manage your orders, and
            enjoy a seamless shopping experience.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
