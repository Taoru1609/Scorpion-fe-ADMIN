import { RouteObject, Outlet } from "react-router-dom";
import { Document1 } from "./document1/Document1";
import { Document2 } from "./document2/Document2";
import Document3 from "./document3/Document3";

const DocumentRouters: RouteObject = {
  path: "/document",
  element: <Outlet />,
  children: [
    { index: true, element: <Document1 /> },
    {
      path: "document1",
      index: true,
      element: <Document1 />,
    },
    {
      path: "document2",
      index: true,
      element: <Document2 />,
    },
    {
      path: "document3",
      index: true,
      element: <Document3 />,
    },
  ],
};

export default DocumentRouters;
