import React from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import NotyfContext from "./NotyfContext";
const notyf = new Notyf();
const NotyfProvider = ({ children }) => {
  return <NotyfContext value={notyf}>{children}</NotyfContext>;
};

export default NotyfProvider;
