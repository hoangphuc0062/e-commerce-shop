import { useRoutes } from "react-router-dom";

import DashboardPage from "../pages/admin/home";
import HomePage from "../pages/web/home";
import DashboardLayout from "../Layout/DashboardLayout/Index";
import PublicLayout from "../Layout/PublicLayout/Index";
import CategoryList from "../pages/admin/category";
export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [{ path: "/", element: <HomePage /> }],
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <DashboardPage /> },
        { path: "category", element: <CategoryList /> },
        { path: "category/create", element: <CategoryList /> },
      ],
    },
  ]);

  // return routes;
  return <div>{routes}</div>;
}
