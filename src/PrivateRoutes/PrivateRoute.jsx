import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../Components/Utilities/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
