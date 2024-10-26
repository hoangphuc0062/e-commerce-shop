import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts";
import ErrorRoute from "./ErrorRoute";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "../pages/auth/login";
import ResetPassword from "../pages/auth/ResetPassword";
import SuperAdminRoute from "./SuperAdminRoute";

export default function RootRouter() {
  const { islogin } = useAuth();
  return (
    <Routes>
      {/* Admin layout wrapper */}

      <Route
        path="/dashboard"
        element={
          islogin ? (
            <PrivateRoute
              element={<AdminLayout />}
              roles={["customer", "staff", "admin", "superadmin"]}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        {islogin && SuperAdminRoute()}
      </Route>

      {/* Error routes */}
      {ErrorRoute()}

      {/* auth */}
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
