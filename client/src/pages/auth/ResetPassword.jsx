import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import { useResetPasswordMutation } from "../../services/auth/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      const response = await resetPassword({
        token,
        password: formData.password,
      }).unwrap();

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Password reset failed");
    }
  };

  return (
    <div
      className="

"
    >
      <div
        className="
w-full
max-w-md
bg-white
rounded-2xl
shadow-xl
border
border-gray-100
p-8
"
      >
        {/* Header */}

        <div
          className="
text-center
mb-8
"
        >
          <div
            className="
mx-auto
w-14
h-14
rounded-full
bg-black
text-white
flex
items-center
justify-center
text-2xl
mb-4
"
          >
            🔐
          </div>

          <h1
            className="
text-3xl
font-bold
text-gray-800
"
          >
            Reset Password
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Create your new password
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
space-y-5
"
        >
          {/* New Password */}

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              New Password
            </label>

            <div
              className="
relative
mt-2
"
            >
              <FiLock
                className="
absolute
left-3
top-1/2
-translate-y-1/2
text-gray-400
"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="
w-full
rounded-xl
border
border-gray-300
py-3
pl-10
pr-12
outline-none
transition
focus:border-black
focus:ring-2
focus:ring-black/10
"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-500
hover:text-black
cursor-pointer
"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <p
              className="
text-red-500
text-xs
mt-1
"
            >
              {errors.password?.message}
            </p>
          </div>

          {/* Confirm Password */}

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Confirm Password
            </label>

            <div
              className="
relative
mt-2
"
            >
              <FiLock
                className="
absolute
left-3
top-1/2
-translate-y-1/2
text-gray-400
"
              />

              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",

                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="
w-full
rounded-xl
border
border-gray-300
py-3
pl-10
pr-3
outline-none
transition
focus:border-black
focus:ring-2
focus:ring-black/10
"
              />
            </div>

            <p
              className="
text-red-500
text-xs
mt-1
"
            >
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Button */}

          <button
            disabled={isLoading}
            className="
w-full
bg-black
text-white
py-3
rounded-xl
font-semibold
transition
duration-300
hover:bg-gray-800
active:scale-95
cursor-pointer
disabled:opacity-50
disabled:cursor-not-allowed
"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Login */}

        <p
          className="
text-center
text-sm
text-gray-500
mt-6
"
        >
          Remember your password?
          <Link
            to="/login"
            className="
ml-1
font-semibold
text-black
hover:underline
cursor-pointer
"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
