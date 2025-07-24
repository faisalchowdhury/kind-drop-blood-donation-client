import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/Utilities/Loading";
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
