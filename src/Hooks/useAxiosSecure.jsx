import React from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useAxiosSecure = () => {
  const { user } = useAuth();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return axiosSecure;
};

export default useAxiosSecure;
