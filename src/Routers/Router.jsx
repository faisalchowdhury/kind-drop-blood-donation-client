import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";
import NotFound from "../Pages/404/NotFound";
import DashboardLayout from "../Layouts/DashboardLayout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: MainLayout,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "/login",
          Component: Login,
        },
        {
          path: "/registration",
          Component: Registration,
        },
      ],
    },
    {
      path: "*",
      Component: NotFound,
    },
    //Dashboard
    {
      path: "/dashboard",
      Component: DashboardLayout,
    },
  ]);

  return router;
};

export default Router;
