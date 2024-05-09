import { RouteObject, Outlet } from "react-router-dom";



const AdminRouters: RouteObject = {
  path: "/admin",
  element: <Outlet />,
  children: [
    // {
    //   path: "roomtype",
    //   index: true,
    //   element: <RoomTypes />,
    // },
   

  ],
};

export default AdminRouters;
