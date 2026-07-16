import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import { useForgotPasswordMutation } from "../../services/auth/authApi";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await forgotPassword(formData.email).unwrap();

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
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
            🔑
          </div>

          <h1
            className="
text-3xl
font-bold
text-gray-800
"
          >
            Forgot Password?
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Enter your email to receive a reset link
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
space-y-5
"
        >
          {/* Email */}

          <div>
            <label
              className="
text-sm
font-semibold
text-gray-700
"
            >
              Email Address
            </label>

            <div
              className="
relative
mt-2
"
            >
              <FiMail
                className="
absolute
left-3
top-1/2
-translate-y-1/2
text-gray-400
"
              />

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
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
              {errors.email?.message}
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back Login */}

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

export default ForgotPassword;
