import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Components/Utilities/Loading";
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
