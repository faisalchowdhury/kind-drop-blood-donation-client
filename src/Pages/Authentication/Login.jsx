import { Link } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/Lottie/login.json";

export default function Login() {
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
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your password"
              />
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
