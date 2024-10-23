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
import CartProduct from "../pages/web/payment/CartProduct";
import Checkout_info from "../pages/web/payment/checkout_info";
import Checkout from "../pages/web/payment/Checkout";
import Profile from "../pages/web/profile/Profile";
import AccountUser from "../pages/web/profile/AccountUser";
import ProductDetail from "../pages/web/product/ProductDetail";
import UserOrder from "../pages/web/profile/UserOrder";
import Manage from "../pages/web/profile/manage";
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
        { path: "/cart", element: <CartProduct /> },
        { path: "/check_info", element: <Checkout_info /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/profile", element: <Profile /> },
        { path: "profile/account", element: <AccountUser /> },
        { path: "profile/order", element: <UserOrder /> },
        { path: "profile/manage", element: <Manage /> },
      ],
    },
    {
      path: "/forum",
      element: <ForumLayout />,
      children: [
        { path: "", element: <ForumPage /> },
        { path: "blog/:slug", element: <DetailBlog /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{routes}</>;
}
