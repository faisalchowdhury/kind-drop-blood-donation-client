import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Components/Utilities/Loading";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const {
    userRole: { role },
    roleLoading,
  } = useUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || role !== "admin") {
    return <Navigate to={"/dashboard/forbidden"}></Navigate>;
  }
  return children;
};

export default AdminRoute;
