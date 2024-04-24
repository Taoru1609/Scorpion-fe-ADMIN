import { RouteObject, Outlet } from "react-router-dom";
import RoomType from "./roomtype/RoomType";

const AdminRouters: RouteObject = {
  path: "/admin",
  element: <Outlet />,
  children: [
    { index: true, element: <RoomType /> },
    {
      path: "roomtype",
      index: true,
      element: <RoomType />,
    },

  ],
};

export default AdminRouters;
