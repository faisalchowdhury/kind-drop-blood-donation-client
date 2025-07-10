import axios from "axios";
import React from "react";
const axiosBase = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosBase = () => {
  return axiosBase;
};

export default useAxiosBase;
