import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";
import NotFound from "../Pages/404/NotFound";
import DashboardLayout from "../Layouts/DashboardLayout";
import Loading from "../Components/Utilities/Loading";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Dashboard/Users";
import Profile from "../Dashboard/Profile";
import CreateDonationRequest from "../Dashboard/CreateDonationRequest";
import AllDonationRequests from "../Dashboard/AllDonationRequests";
import MyDonationRequests from "../Dashboard/MyDonationRequests";

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
      element: (
        <PrivateRoute>
          <DashboardLayout></DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/users",
          Component: Users,
        },
        {
          path: "/dashboard/profile",
          Component: Profile,
        },
        {
          path: "/dashboard/all-donation-requests",
          element: <AllDonationRequests></AllDonationRequests>,
        },
        // Donor Dashboard
        {
          path: "/dashboard/create-donation-request",
          element: <CreateDonationRequest></CreateDonationRequest>,
        },
        {
          path: "/dashboard/my-donation-requests",
          element: <MyDonationRequests></MyDonationRequests>,
        },
      ],
    },
  ]);

  return router;
};

export default Router;
