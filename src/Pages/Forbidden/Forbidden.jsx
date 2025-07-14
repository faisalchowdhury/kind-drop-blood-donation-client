import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="text-red-500 mb-4">
        <FaLock size={80} />
      </div>
      <h1 className="text-5xl font-bold text-slate-800 mb-4">403 Forbidden</h1>
      <p className="text-lg text-slate-600 text-center max-w-md mb-6">
        Sorry, you do not have permission to access this page. Please check your
        account or contact the administrator if you believe this is a mistake.
      </p>
      <Link to="/dashboard" className="btn btn-primary text-white">
        Back to Dashboard Home
      </Link>
    </div>
  );
}
