import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import "./../App.css";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="lg:max-w-[1400px] p-5 xl:px-0 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
