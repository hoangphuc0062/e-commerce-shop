// AdminRoute.js
import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import CategoryPage from "../pages/category";
import StaffPage from "../pages/staff";
import AddStaff from "../pages/staff/create";
import PrivateRoute from "./PrivateRoute";
import History from "../pages/history";
import UserPage from "../pages/user";
import WarehousePage from "../pages/warehouse";
import AddWarehouse from "../pages/warehouse/create";
// import CreateCaterory from "../pages/category/create";
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
      {/* <Route
        path="category/create"
        element={
          <PrivateRoute
            element={<CreateCaterory />}
            roles={["customer", "staff", "admin", "superadmin"]}
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
      {/** route user */}

      <Route
        path="customer"
        element={
          <PrivateRoute
            element={<UserPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="customer/create"
        element={
          <PrivateRoute
            element={<UserPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      {/* kho hàng */}
      <Route
        path="warehouse"
        element={
          <PrivateRoute
            element={<WarehousePage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      {/* Nhập sản phẩm vào kho */}
      <Route
        path="warehouse/create"
        element={
          <PrivateRoute
            element={<AddWarehouse />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
    </>
  );
};

export default AdminRoute;
