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
import ProductDetail from "../pages/web/product/ProductDetail";
import { ForgetPassoword } from "../pages/auth/ForgetPassoword";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProfileLayout } from "../Layout/ProfileLayout";
import { Account } from "../pages/web/member/Account";
import { Order } from "../pages/web/member/Order";
import { Address } from "../pages/web/member/Address";
import { HomeProfile } from "../pages/web/member/Home";
import { Coupon } from "../pages/web/member/Coupon";
import { HistoryOrder } from "../pages/web/member/HistoryOrder";
export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/forget-password", element: <ForgetPassoword /> },
        { path: "register", element: <Register /> },
        { path: "/phone", element: <ProductList /> },
        { path: "/phone/:slug", element: <ProductDetail /> },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <CartProduct />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout_info />
            </ProtectedRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            // <ProtectedRoute>
            //   <ProfileLayout />
            // </ProtectedRoute>
            <ProfileLayout />
          ),
          children: [
            { path: "", element: <HomeProfile /> },
            { path: "account", element: <Account /> },
            { path: "coupon", element: <Coupon /> },
            { path: "address", element: <Address /> },
            { path: "order", element: <Order /> },
            { path: "history-order", element: <HistoryOrder /> },
          ],
        },
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
