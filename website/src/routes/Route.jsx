import { PublicLayout } from "../layouts/publicLayout";
import { useRoutes } from "react-router-dom";
import {
  HomePage,
  Login,
  ForgetPassoword,
  Register,
  Error,
  Product,
  ProductDetail,
} from "../pages/web";
import { ProfileLayout } from "../layouts/profileLayout";
import {
  HomeProfile,
  Address,
  Order,
  Account,
  Password,
  Coupon,
} from "../pages/web/member";
import { ProtectedRoute } from "./ProtectedRoute";
import { Cart } from "../pages/web/cart";
import Finalregister from "../pages/web/auth/finalregister";
import { ViewOrder } from "../pages/web/order/ViewOrder";
import AboutUs from "../pages/web/aboutUs";
import { AuthLayout } from "../layouts/AuthLayout";
import { ResetPassword } from "../pages/web/auth/ResetPassword";

export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <HomePage /> },

        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "/look-up-order", element: <ViewOrder /> },
        {
          path: "/:category",
          element: <Product />,
        },
        {
          path: "/:category/:brand",
          element: <Product />,
        },
        {
          path: "/:category/:brand/:product",
          element: <ProductDetail />,
        },

        {
          path: "/ve-chung-toi",
          element: <AboutUs />,
        },
        {
          path: "/profile",
          element: <ProfileLayout />,
          children: [
            {
              path: "",
              element: (
                <ProtectedRoute>
                  <HomeProfile />
                </ProtectedRoute>
              ),
            },
            {
              path: "account",
              element: (
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              ),
            },
            {
              path: "coupon",
              element: (
                <ProtectedRoute>
                  <Coupon />
                </ProtectedRoute>
              ),
            },
            {
              path: "address",
              element: (
                <ProtectedRoute>
                  <Address />
                </ProtectedRoute>
              ),
            },
            {
              path: "change-password",
              element: (
                <ProtectedRoute>
                  <Password />
                </ProtectedRoute>
              ),
            },
            {
              path: "order",
              element: (
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            { path: "", element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "forget-password", element: <ForgetPassoword /> },
            { path: "register", element: <Register /> },
            { path: "reset-password/:token", element: <ResetPassword /> },
            {
              path: "finalregister/:token",
              element: <Finalregister />,
            },
            {
              path: "*",
              element: <Error />,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/404",
      element: <Error />,
    },
  ]);
  return routes;
}
