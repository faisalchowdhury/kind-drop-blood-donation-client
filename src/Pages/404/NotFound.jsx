import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <div className="text-center">
        <h1 className="text-[120px] font-bold text-accent drop-shadow-sm">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist, was removed, or
          the URL is incorrect.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow hover:bg-accent/90 transition-transform transform hover:scale-105">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
