// AdminRoute.js
import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import CategoryPage from "../pages/category";
import AddCategory from "../pages/category/create";
import StaffPage from "../pages/staff";
import AddStaff from "../pages/staff/create";
import PrivateRoute from "./PrivateRoute";
import History from "../pages/history";

const AdminRoute = () => {
  return (
    <>
      {/* Home Page route */}
      <Route
        index
        element={<PrivateRoute element={<HomePage />} roles={["superadmin"]} />}
      />
      <Route
        path="history"
        element={<PrivateRoute element={<History />} roles={["superadmin"]} />}
      />

      {/* Category Page route */}
      <Route
        path="category"
        element={
          <PrivateRoute
            element={<CategoryPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />

      {/* Add Category Page route */}
      <Route
        path="category/create"
        element={
          <PrivateRoute
            element={<AddCategory />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />

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

      {/* Add Staff Page route */}
      <Route
        path="staff/create"
        element={
          <PrivateRoute
            element={<AddStaff />}
            roles={["admin", "superadmin"]}
          />
        }
      />
    </>
  );
};

export default AdminRoute;
