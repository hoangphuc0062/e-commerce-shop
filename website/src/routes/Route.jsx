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
              element: <HomeProfile />,
            },
            {
              path: "account",
              element: <Account />,
            },
            {
              path: "coupon",
              element: <Coupon />,
            },
            {
              path: "address",
              element: <Address />,
            },
            {
              path: "order",
              element: <Order />,
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
