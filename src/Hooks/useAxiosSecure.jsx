import React from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: "https://kind-drop-blood-donation.vercel.app",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return axiosSecure;
};

export default useAxiosSecure;
