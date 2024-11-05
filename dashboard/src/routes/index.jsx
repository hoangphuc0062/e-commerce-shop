import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts";
import AdminRoute from "./AdminRoute";
import ErrorRoute from "./ErrorRoute";
import EditorRoute from "./EditorRoute";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../pages/auth/login";
import ResetPassword from "../pages/auth/ResetPassword";
import React from "react";
import { UserContext } from "../contexts/AuthContext";

export default function RootRouter() {
  const { loginAuth } = React.useContext(UserContext);

  return (
    <Routes>
      {/* Admin layout wrapper */}

      <Route
        path="/dashboard"
        element={
          loginAuth ? (
            <PrivateRoute
              element={<AdminLayout />}
              roles={["customer", "staff", "admin", "superadmin"]}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        {loginAuth && AdminRoute()}
        {loginAuth && EditorRoute()}
      </Route>

      {/* Error routes */}
      {ErrorRoute()}

      {/* auth */}
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
