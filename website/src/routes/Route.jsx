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
  Coupon,
} from "../pages/web/member";
import { ProtectedRoute } from "./ProtectedRoute";
import { Cart } from "../pages/web/cart";

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
        { path: "/cart", element: <Cart /> },
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
              path: "order",
              element: (
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Error />,
    },
    // {
    //   path: "/404",
    //   element: <Error />,
    // },
  ]);
  return routes;
}
