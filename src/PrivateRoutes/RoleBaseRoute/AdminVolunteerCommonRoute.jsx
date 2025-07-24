import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/Utilities/Loading";
import { Navigate } from "react-router";

const AdminVolunteerCommonRoute = () => {
  const { user, loading } = useAuth();
  const {
    userRole: { role },
    roleLoading,
  } = useUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || !(role === "admin" || role === "volunteer")) {
    return <Navigate to="/dashboard/forbidden"></Navigate>;
  }
  return <div></div>;
};

export default AdminVolunteerCommonRoute;
