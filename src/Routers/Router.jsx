import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import NotFound from "../pages/404/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import Loading from "../components/Utilities/Loading";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import Users from "../dashboard/Users";
import Profile from "../dashboard/Profile";
import CreateDonationRequest from "../dashboard/CreateDonationRequest";
import AllDonationRequests from "../dashboard/AllDonationRequests";
import MyDonationRequests from "../dashboard/MyDonationRequests";
import AddBlog from "../dashboard/ContentManagement/AddBlog";
import AllBlogs from "../dashboard/ContentManagement/AllBlogs";
import EditBlog from "../dashboard/ContentManagement/EditBlog";
import AllBlogsFrontEnd from "../pages/AllBlogs/AllBlogs";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import DonationRequestDetails from "../pages/DonationRequests/DonationRequestDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationPayment from "../pages/Funding/DonationPayment";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../PrivateRoutes/RoleBaseRoute/AdminRoute";
import BlogPreview from "../dashboard/ContentManagement/BlogPreview";
import ViewDonationRequestDetails from "../dashboard/ViewDonationRequestDetails";
import EditDonationRequest from "../dashboard/EditDonationRequest";
import Search from "../pages/Search/Search";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import DonorGuidelines from "../pages/DonorGuidelines/DonorGuidelines";
import Faq from "../pages/Faq/Faq";

// Replace with your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51Rg9SKRjZ7l8BlE9V6v58DeVP2TKvUOwwSVee9wrpUTM0DaAx4ow5LHG6S3LtL1cwyZRxG6MS62Nu4DpRANAGN1X00wC7HtsY0"
);

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
          path: "/privacy-policy",
          Component: PrivacyPolicy,
        },
        {
          path: "/terms",
          Component: TermsAndConditions,
        },
        {
          path: "/donor-guidelines",
          Component: DonorGuidelines,
        },
        {
          path: "/faq",
          Component: Faq,
        },
        {
          path: "/donation-request-details/:id",
          element: (
            <PrivateRoute>
              <DonationRequestDetails />
            </PrivateRoute>
          ),
        },
        {
          path: "/funding-donation",
          element: (
            <Elements stripe={stripePromise}>
              <DonationPayment></DonationPayment>
            </Elements>
          ),
        },
        {
          path: "/search",
          element: <Search></Search>,
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
          path: "/dashboard/forbidden",
          Component: Forbidden,
        },
        {
          path: "/dashboard/users",
          element: (
            <AdminRoute>
              <Users></Users>
            </AdminRoute>
          ),
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
          path: "/dashboard/view-donation-request-details/:id",
          element: <ViewDonationRequestDetails></ViewDonationRequestDetails>,
        },
        {
          path: "/dashboard/edit-donation-request/:id",
          element: <EditDonationRequest></EditDonationRequest>,
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
        {
          path: "/dashboard/content-management/blog-preview/:id",
          element: <BlogPreview></BlogPreview>,
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
