import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../components/Utilities/Logo";
import LogoLight from "../assets/Logos/logo-light.png";
import useAuth from "../hooks/useAuth";
import useNotification from "../hooks/useNotification";

const Header = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const notification = useNotification();
  const navigate = useNavigate();
  const { signOutUser } = useAuth();
  const logoutUser = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
        notification.success("Logout successful");
      })
      .catch((err) => console.log(err));
  };
  const menu = (
    <>
      <li>
        <NavLink to={"/donation-requests"}>Donation requests</NavLink>
      </li>
      <li>
        <NavLink to={"/all-blogs"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/search"}>Search Donors</NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to={"/funding-donation"}>Funding</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-[#ff202036]">
      <div className="navbar bg-base-100 max-w-[1400px] mx-auto px-5 2xl:px-0">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow bg-white">
              {menu}
              {user && (
                <>
                  <li>
                    {" "}
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={logoutUser}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Logo logo={LogoLight}></Logo>
        </div>

        <div className="navbar-end hidden lg:flex space-x-2">
          <ul className="menu menu-horizontal px-1 text-primary">{menu}</ul>
          {/* Dropdown */}
          {user ? (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center focus:outline-none">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/2y8Yw4V/default-avatar.png"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full  shadow"
                  />
                </button>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/registration"
              className="btn bg-accent hover:bg-primary duration-500 text-white border-none rounded-full ">
              Join as a donor
            </Link>
          )}

          {/* Dropdown */}
        </div>
      </div>
    </div>
  );
};

export default Header;
