import React from "react";
import logoLight from "../../assets/Logos/logo-light.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <div>
      <Link>
        <img className="w-[150px]" src={logoLight} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
