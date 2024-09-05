import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts";
import HomePage from "../pages/home";
import CategoryPage from "../pages/category";
import AddCategory from "../pages/category/create";

export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        { index: true, element: <HomePage /> }, //
        { path: "category", element: <CategoryPage /> },
        { path: "category/create", element: <AddCategory /> },
      ],
    },
  ]);

  return routes;
}
