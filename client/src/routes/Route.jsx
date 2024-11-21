import { useRoutes } from "react-router-dom";
import ForumLayout from "../Layout/ForumLayout/index";
import { NotFound } from "../pages/404/NotFound";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import ForumPage from "../pages/web/forum";
import DetailBlog from "../pages/web/forum/DetailBlog";
import { ForgetPassoword } from "../pages/auth/ForgetPassoword";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProfileLayout } from "../Layout/ProfileLayout";
import { Account } from "../pages/web/member/Account";
import { HomeProfile } from "../pages/web/member/Home";
import CategoryPost from "../pages/web/forum/CategoryPost";
import TagPost from "../pages/web/forum/TagPost";
export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <ForumLayout />,
      children: [
        {
          path: "",
          element: <ForumPage />,
        },
        { path: ":slug", element: <DetailBlog /> },
        { path: "category/:categorySlug", element: <CategoryPost /> },
        { path: "tag/:tagsName", element: <TagPost /> },
        { path: "/login", element: <Login /> },
        { path: "/forget-password", element: <ForgetPassoword /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfileLayout />
        </ProtectedRoute>
      ),
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
      ],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{routes}</>;
}
