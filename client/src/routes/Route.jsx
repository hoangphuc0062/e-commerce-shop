import { useRoutes } from "react-router-dom";
import HomePage from "../pages/web/home";
import PublicLayout from "../Layout/PublicLayout/Index";
import ForumLayout from "../Layout/ForumLayout/index";
import { NotFound } from "../pages/404/NotFound";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import ForumPage from "../pages/web/forum";
import DetailBlog from "../pages/web/forum/DetailBlog";
import ProductList from "../pages/web/product/ProductList";
import ProductDetail from "../pages/web/product/ProductDetail";

export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "/phone", element: <ProductList /> },
        { path: "/phone/:slug", element: <ProductDetail /> },
      ],
    },
    {
      path: "/forum",
      element: <ForumLayout />,
      children: [
        { path: "", element: <ForumPage /> },
        { path: "blog/:id", element: <DetailBlog /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{routes}</>;
}
