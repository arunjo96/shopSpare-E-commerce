
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

import { useLoginMutation } from "../../services/auth/authApi";
import { setCredentials } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await login(formData).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        }),
      );

      toast.success(response.message);

      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}

        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl mb-4">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative mt-2">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-3 text-gray-700 outline-none transition duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          {/* Password */}

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative mt-2">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 text-gray-700 outline-none transition duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Button */}

          <button
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold transition duration-300 hover:bg-gray-800 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link
          to="/"
          className="flex items-center gap-2 text-sm mt-4 justify-center font-medium text-gray-600 hover:text-black cursor-pointer"
        >
          <FiArrowLeft /> Home
        </Link>

        {/* Register */}

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-semibold text-black hover:underline cursor-pointer"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;