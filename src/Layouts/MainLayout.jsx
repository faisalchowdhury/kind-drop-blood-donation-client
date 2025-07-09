import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import "./../App.css";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="lg:max-w-[1400px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
