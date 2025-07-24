import React, { useContext } from "react";
import NotyfContext from "../notyf/NotyfContext";

const useNotification = () => {
  const notyf = useContext(NotyfContext);
  return notyf;
};

export default useNotification;
