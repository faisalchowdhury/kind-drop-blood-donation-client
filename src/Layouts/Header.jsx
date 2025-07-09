import React from "react";
import { NavLink } from "react-router";
import Logo from "../Components/Utilities/Logo";
import LogoLight from "../assets/Logos/logo-light.png";
const Header = () => {
  const menu = (
    <>
      <li>
        <NavLink>Donation requests</NavLink>
      </li>
      <li>
        <NavLink>Blogs</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-[#ff202036]">
      <div className="navbar bg-base-100 max-w-[1400px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {menu}
            </ul>
          </div>

          <Logo logo={LogoLight}></Logo>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-primary">{menu}</ul>
          <button className="btn bg-accent hover:bg-primary duration-500 text-white border-none rounded-full ">
            Join as a donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
