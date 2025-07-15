import React from "react";

const Fallback = ({ message }) => {
  return (
    <div>
      <div className="h-[50vh] flex justify-center items-center bg-slate-100 border rounded border-dashed border-accent">
        <h1 className="text-2xl">{message}</h1>
      </div>
    </div>
  );
};

export default Fallback;
