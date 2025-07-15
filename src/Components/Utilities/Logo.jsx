import React from "react";

import { Link } from "react-router";
const Logo = ({ logo, size = 150 }) => {
  return (
    <div>
      <Link to={"/"}>
        <img className={`w-[${size}px]`} src={logo} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
