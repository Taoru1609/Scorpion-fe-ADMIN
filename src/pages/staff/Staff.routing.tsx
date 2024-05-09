import { RouteObject, Outlet } from "react-router-dom";
import Reservation from "./reservation/Reservation";
import RoomDiagram from "./roomdiagram/RoomDiagram";


const StaffRouters: RouteObject = {
  path: "/staff",
  element: <Outlet />,
  children: [
    {
      path: "reservation",
      index: true,
      element: <Reservation />,
    },
    {
      path: "roomdiagram",
      index: true,
      element: <RoomDiagram />,
    },  
   

  ],
};

export default StaffRouters;
