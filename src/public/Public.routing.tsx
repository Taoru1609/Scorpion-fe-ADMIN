import React from "react";
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import Error403View from "./error/error-403/Error403.view";
import Login from "./login/Login";
import InHoaDon from "src/pages/staff/roomdiagram/hoadon/inhoadon/InHoaDon";


// Auth

// Quản lý đảng bộ trự thuộc

//
//
const PublicRouters: RouteObject = {
  path: "/public",
  element: <Outlet />,
  children: [
    {
      path: "login",
      index: true,
      element: <Login />,
    },
    {
      path: "error-403",
      index: true,
      element: <Error403View />,
    },
    {
      path: "inhoadon",
      index: true,
      element: <InHoaDon />,
    }  
  ],
};

export default PublicRouters;
