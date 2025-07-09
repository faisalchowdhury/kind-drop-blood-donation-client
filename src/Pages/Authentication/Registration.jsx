import { useState } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/Lottie/registration.json"; 

export default function Registration() {
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left Side: Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Create Your KindDrop Account</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" placeholder="Email" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="text" placeholder="Avatar URL (ImageBB)" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent col-span-1 md:col-span-2" />
            <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
              <option>District</option>
              {/* Dynamically map district options here */}
            </select>
            <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
              <option>Upazila</option>
              {/* Dynamically map upazila options here */}
            </select>
            <input type="password" placeholder="Password" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />

            <button type="submit" className="col-span-1 md:col-span-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded transition mt-2">
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-slate-200 p-4">
        <div className="max-w-xs w-full">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
      </div>

    </div>
  );
}