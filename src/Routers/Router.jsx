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
import AddBlog from "../Dashboard/ContentManagement/AddBlog";
import AllBlogs from "../Dashboard/ContentManagement/AllBlogs";
import EditBlog from "../Dashboard/ContentManagement/EditBlog";
import AllBlogsFrontEnd from "../Pages/AllBlogs/AllBlogs";
import BlogDetails from "../Pages/BlogDetails/BlogDetails";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../Pages/DonationRequests/DonationRequestDetails";

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
        {
          path: "/all-blogs",
          Component: AllBlogsFrontEnd,
        },
        {
          path: "/blog-details/:id",
          Component: BlogDetails,
        },
        {
          path: "/donation-requests",
          Component: DonationRequests,
        },
        {
          path: "/donation-request-details/:id",
          Component: DonationRequestDetails,
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
        {
          path: "/dashboard/content-management/add-blog",
          element: <AddBlog></AddBlog>,
        },
        {
          path: "/dashboard/content-management/all-blogs",
          element: <AllBlogs></AllBlogs>,
        },
        {
          path: "/dashboard/content-management/edit-blog/:id",
          element: <EditBlog></EditBlog>,
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
