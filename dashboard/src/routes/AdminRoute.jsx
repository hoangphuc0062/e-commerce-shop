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
import ProductPage from "../pages/product";
import CreateProductForm from "../pages/product/create";
import VariantForm from "../pages/product/variant/create";
import VariantPage from "../pages/product/variant";
import OrderPage from "../pages/order";
import SiteConfig from "../pages/webconfig";
import PaymentConfig from "../pages/paymentconfig";
import BannerCollection from "../pages/bannercollection";
import PostList from "../pages/post";
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
        path="staff/edit/:id"
        element={
          <PrivateRoute
            element={<AddStaff />}
            roles={["admin", "superadmin"]}
          />
        }
      />
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

      {/* product */}
      <Route
        path="product"
        element={
          <PrivateRoute
            element={<ProductPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="product/create"
        element={
          <PrivateRoute
            element={<CreateProductForm />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="product/variant"
        element={
          <PrivateRoute
            element={<VariantPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="product/variant/create"
        element={
          <PrivateRoute
            element={<VariantForm />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />

      {/* order */}

      <Route
        path="order"
        element={
          <PrivateRoute
            element={<OrderPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="webconfig"
        element={
          <PrivateRoute
            element={<SiteConfig />}
            roles={["admin", "superadmin"]}
          />
        }
      />
      <Route
        path="paymentconfig"
        element={
          <PrivateRoute
            element={<PaymentConfig />}
            roles={["admin", "superadmin"]}
          />
        }
      />
      <Route
        path="bannercollection"
        element={
          <PrivateRoute
            element={<BannerCollection />}
            roles={["admin", "superadmin"]}
          />
        }
      />
      <Route
        path="post"
        element={
          <PrivateRoute
            element={<PostList />}
            roles={["admin", "superadmin"]}
          />
        }
      />
    </>
  );
};

export default AdminRoute;
