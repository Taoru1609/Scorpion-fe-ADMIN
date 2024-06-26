import React from "react";
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../pages/home/Home";
import StaffRouters from "src/pages/staff/Staff.routing";
import AdminRouters from "src/pages/admin/Admin.routing";

const LayoutRoutes: RouteObject = {
  path: "/",
  element: <Outlet />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "home",
      index: true,
      element: <Home />,
    },
   
    StaffRouters,
    AdminRouters
  ],
};

export default LayoutRoutes;
