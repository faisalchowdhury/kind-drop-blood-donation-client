import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Lottie from "lottie-react";
import contact from "../../assets/Lottie/contact.json";
import Swal from "sweetalert2";
export default function Contact() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your message sent successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <section className=" mx-auto my-10 bg-[#f4faff] grid md:grid-cols-5 gap-8  px-5 sm:px-10 xl:px-20 py-10 rounded-2xl border border-dashed">
      {/* Left Side - Contact Info */}
      <div className="col-span-2 flex flex-col justify-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          Get in Touch
        </h1>
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-primary text-xl" />
          <p className="text-gray-700">123 Main Street, Dhaka, Bangladesh</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-primary text-xl" />
          <p className="text-gray-700">contact@kinddrop.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaPhone className="text-primary text-xl" />
          <p className="text-gray-700">+880 1234 567890</p>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <form
        onSubmit={handleFormSubmit}
        className=" p-8 shadow-lg space-y-4 col-span-3 border-2 border-dashed rounded-2xl border-slate-500 text-white bg-primary">
        <div className="sm:flex gap-5 space-y-3 sm:space-y-0">
          <div className="flex-1">
            <label className="block text-white mb-1">Name</label>
            <input
              required
              type="text"
              placeholder="Your name"
              className="w-full border border-white rounded px-4 py-2 focus:outline-none focus:border-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white mb-1">Email</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="w-full border border-white rounded px-4 py-2 focus:outline-none focus:border-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-1">Message</label>
          <textarea
            required
            placeholder="Your message"
            rows="3"
            className="w-full border border-white rounded px-4 py-2 focus:outline-none focus:border-white"></textarea>
        </div>
        <button
          type="submit"
          className="w-full  text-white rounded px-4 py-2 hover:bg-primary-dark transition bg-accent">
          Send Message
        </button>
      </form>
    </section>
  );
}
