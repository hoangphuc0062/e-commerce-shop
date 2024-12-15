import { useRoutes } from "react-router-dom";
import ForumLayout from "../Layout/ForumLayout/index";
import { NotFound } from "../pages/404/NotFound";
import ForumPage from "../pages/web/forum";
import DetailBlog from "../pages/web/forum/DetailBlog";
import CategoryPost from "../pages/web/forum/CategoryPost";
import TagPost from "../pages/web/forum/TagPost";
import Login from "../pages/auth/Login";
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
