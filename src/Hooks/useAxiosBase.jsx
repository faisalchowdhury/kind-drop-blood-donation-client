import axios from "axios";
import React from "react";
const axiosBase = axios.create({
  baseURL: "https://kind-drop-blood-donation.vercel.app",
});
const useAxiosBase = () => {
  return axiosBase;
};

export default useAxiosBase;
