import { PublicLayout } from "../layouts/publicLayout";
import { useRoutes } from "react-router-dom";
import {
  HomePage,
  Login,
  ForgetPassoword,
  Register,
  Error,
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
  ]);
  return routes;
}
