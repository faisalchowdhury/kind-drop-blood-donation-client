import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import "./../App.css";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
