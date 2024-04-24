import { RouteObject, Outlet } from "react-router-dom";
import Reservation from "./reservation/Reservation";
import RoomDiagram from "./roomdiagram/RoomDiagram";

const StaffRouters: RouteObject = {
  path: "/staff",
  element: <Outlet />,
  children: [
    { index: true, element: <Reservation /> },
    {
      path: "reservation",
      index: true,
      element: <Reservation />,
    },
    
    { index: true, element: <RoomDiagram /> },
    {
      path: "roomdiagram",
      index: true,
      element: <RoomDiagram />,
    }    
  ],
};

export default StaffRouters;
