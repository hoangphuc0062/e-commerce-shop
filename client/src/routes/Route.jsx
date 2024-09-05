import { useRoutes } from "react-router-dom";

import DashboardPage from "../pages/admin/home";
import HomePage from "../pages/web/home";
import DashboardLayout from "../Layout/DashboardLayout/Index";
import PublicLayout from "../Layout/PublicLayout/Index";
import CategoryList from "../pages/admin/category";
import { NotFound } from "../pages/404/NotFound";
import PrivateRoute from "./PrivateRoute";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import TestFileBase from "../pages/testFileBase";

export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "test", element: <TestFileBase /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "", element: <DashboardPage /> },
        { path: "category", element: <CategoryList /> },
        { path: "category/create", element: <CategoryList /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{routes}</>;
}
