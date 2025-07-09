import React from "react";

import { Link } from "react-router";
const Logo = ({ logo }) => {
  return (
    <div>
      <Link>
        <img className="w-[150px]" src={logo} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
