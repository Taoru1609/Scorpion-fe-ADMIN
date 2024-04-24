import React from "react";
import { Outlet } from "react-router-dom";

export const PublicView = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
