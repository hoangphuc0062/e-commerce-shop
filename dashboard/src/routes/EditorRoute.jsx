// EditorRoute.js
import { Route } from "react-router-dom";
import CategoryPage from "../pages/category";
// import AddCategory from "../pages/category/create";
import StaffPage from "../pages/staff";
import PrivateRoute from "./PrivateRoute";

export default function EditorRoute() {
  return (
    <>
      {/* Category Page route */}
      <Route
        path="category"
        element={
          <PrivateRoute
            element={<CategoryPage />}
            roles={["staff", "admin", "superadmin"]}
          />
        }
      />

      {/* Add Category Page route */}
      {/* <Route
        path="category/create"
        element={
          <PrivateRoute
            element={<AddCategory />}
            roles={["staff", "superadmin"]}
          />
        }
      /> */}

      {/* Staff Page route */}
      <Route
        path="staff"
        element={
          <PrivateRoute
            element={<StaffPage />}
            roles={["admin", "superadmin"]}
          />
        }
      />
    </>
  );
}
