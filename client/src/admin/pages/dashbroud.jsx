import React from "react";
import { Outlet } from "react-router-dom";

const dashbroud = () => {
  return (
    <div>
      dashbroud
      <Outlet />
    </div>
  );
};

export default dashbroud;
