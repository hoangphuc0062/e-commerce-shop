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
import VariantForm from "../pages/product/variant/create";
import VariantPage from "../pages/product/variant";
import OrderPage from "../pages/order";
import SiteConfig from "../pages/webconfig";
import PaymentConfig from "../pages/paymentconfig";
import BannerCollection from "../pages/bannercollection";

import PostList from "../pages/post";
import AddPost from "../pages/post/create";
import EditPost from "../pages/post/edit";

import EditStaff from "../pages/staff/edit";
import CouponsList from "../pages/coupons";
import CategoryCreate from "../pages/category/create";
import AddCoupond from "../pages/coupons/create";
import UpdateCoupons from "../pages/coupons/edit";
import CategoryEdit from "../pages/category/edit";
import BrandPage from "../pages/brand";
import CollectionPage from "../pages/collection";
import AddBannerConllection from "../pages/bannercollection/create";
import EditBannerCollection from "../pages/bannercollection/edit";
import CreateProduct from "../pages/product/create";
import EditProduct from "../pages/product/update";
import TagPage from "../pages/tags";

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
      <Route
        path="category/create"
        element={
          <PrivateRoute
            element={<CategoryCreate />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="category/update/:id"
        element={
          <PrivateRoute
            element={<CategoryEdit />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />

      <Route
        path="brand"
        element={
          <PrivateRoute
            element={<BrandPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />

      <Route
        path="collection"
        element={
          <PrivateRoute
            element={<CollectionPage />}
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
        path="staff/edit/:id"
        element={
          <PrivateRoute
            element={<EditStaff />}
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
            element={<CreateProduct />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="product/update/:id"
        element={
          <PrivateRoute
            element={<EditProduct />}
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
        path="bannercollection/create"
        element={
          <PrivateRoute
            element={<AddBannerConllection />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="bannercollection/edit/:id"
        element={
          <PrivateRoute
            element={<EditBannerCollection />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      {/* bài đăng */}
      <Route
        path="post"
        element={
          <PrivateRoute
            element={<PostList />}
            roles={["admin", "superadmin"]}
          />
        }
      />
      <Route
        path="post/create"
        element={
          <PrivateRoute
            element={<AddPost />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="post/edit/:id"
        element={
          <PrivateRoute
            element={<EditPost />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      {/* Mã giảm giá */}
      <Route
        path="coupons"
        element={
          <PrivateRoute
            element={<CouponsList />}
            roles={["admin", "superadmin"]}
          />
        }
      />
      <Route
        path="coupons/create"
        element={
          <PrivateRoute
            element={<AddCoupond />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="coupons/edit/:id"
        element={
          <PrivateRoute
            element={<UpdateCoupons />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
      <Route
        path="tags"
        element={
          <PrivateRoute
            element={<TagPage />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      />
    </>
  );
};

export default AdminRoute;
