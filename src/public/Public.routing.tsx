import React from "react";
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import Error403View from "./error/error-403/Error403.view";
import Login from "./login/Login";


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
  ],
};

export default PublicRouters;
