import { Link } from "react-router";
import LogoDark from "../assets/Logos/logo-dark.png";
import Logo from "../Components/Utilities/Logo";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full py-20">
      <div className="max-w-[1400px] mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Column 1: Logo and About */}
        <div className="space-y-5">
          <Logo logo={LogoDark}></Logo>
          <p className="text-sm text-gray-200">
            KindDrop connects donors with those in need, making blood donation
            accessible and community-driven to save lives.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-200 text-sm">
            <li>
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donation-requests" className="hover:text-accent">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-accent">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-medium mb-2">Resources</h3>
          <ul className="space-y-1 text-gray-200 text-sm">
            <li>
              <Link to="/faq" className="hover:text-accent">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/donor-guidelines" className="hover:text-accent">
                Donor Guidelines
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-lg font-medium mb-2">Contact</h3>
          <ul className="space-y-1 text-gray-200 text-sm">
            <li>123 Main Street, Dhaka</li>
            <li>contact@kinddrop.com</li>
            <li>+880 1234 567890</li>
          </ul>
        </div>

        {/* Column 5: Follow Us */}
        <div>
          <h3 className="text-lg font-medium mb-2">Follow Us</h3>
          <ul className="flex space-x-4 text-gray-200 text-xl">
            <li>
              <Link to="#" className="hover:text-accent" aria-label="Facebook">
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-accent" aria-label="Twitter">
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-accent" aria-label="Instagram">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-accent" aria-label="LinkedIn">
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
