import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Lottie from "lottie-react";
import contact from "../../assets/Lottie/contact.json";
export default function Contact() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      {/* Left Side - Contact Info */}
      <div className="flex flex-col justify-center space-y-4">
        <Lottie
          animationData={contact}
          loop={true}
          style={{ width: "250px" }}
        />
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          Get in Touch
        </h1>
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-primary text-xl" />
          <p className="text-gray-700">123 Main Street, Dhaka, Bangladesh</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-primary text-xl" />
          <p className="text-gray-700">contact@lifelink.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaPhone className="text-primary text-xl" />
          <p className="text-gray-700">+880 1234 567890</p>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <form className="bg-white p-8 rounded shadow-lg space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            placeholder="Your message"
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary"></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white rounded px-4 py-2 hover:bg-primary-dark transition">
          Send Message
        </button>
      </form>
    </section>
  );
}
