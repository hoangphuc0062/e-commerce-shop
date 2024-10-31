import { PublicLayout } from "../layouts/publicLayout";
import { useRoutes } from "react-router-dom";
import {
  HomePage,
  Login,
  ForgetPassoword,
  Register,
  Error,
} from "../pages/web";

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
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return routes;
}
