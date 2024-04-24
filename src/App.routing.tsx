import { RouteObject, useRoutes } from "react-router-dom";
import { LayoutView } from "./layout/Layout.view";
import LayoutRoutes from "./layout/Layout.routing";
import { PublicView } from "./public/Public.view";
import PublicRouters from "./public/Public.routing";
import Error404View from "./public/error/error-404/Error404.view";

const routes: RouteObject[] = [
  {
    path: `${process.env.PUBLIC_URL}`,
    element: <LayoutView />,
    children: [LayoutRoutes],
  },
  {
    path: `public`,
    element: <PublicView />,
    children: [PublicRouters],
  },
  {
    path: '*',
    element: <Error404View />
  }
];

const AppRoutes = () => {

  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
