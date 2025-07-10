import React from "react";
import { ClockLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClockLoader color="#060a31 " />
    </div>
  );
};

export default Loading;
