import { Link } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/Lottie/login.json";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";

export default function Login() {
  const { userLogin, user } = useAuth();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginUserAuthentication = (data) => {
    userLogin(data?.email, data?.password)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Lottie Animation */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-slate-200 p-4">
        <div className="max-w-xs w-full">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Login to KindDrop
          </h2>
          <form
            onSubmit={handleSubmit(loginUserAuthentication)}
            className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
              {errors.email && errors.emial.type === "required" ? (
                <p className="text-accent">Email field is require </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your password"
              />
              {errors.password && errors.password.type === "required" ? (
                <p className="text-accent">Please enter your password</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded transition">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Haven't created an account?{" "}
            <Link
              to="/registration"
              className="text-accent hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
