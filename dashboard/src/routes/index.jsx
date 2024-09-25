import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts";
import AdminRoute from "./AdminRoute";
import ErrorRoute from "./ErrorRoute";
import EditorRoute from "./EditorRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/auth/login";
import { useAuth } from "../contexts/AuthContext";

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
            <Navigate to="/dashboard/login" />
          )
        }
      >
        {/* superadmin routes */}
        {AdminRoute()}

        {/* admin routes */}
        {EditorRoute()}
      </Route>

      {/* Error routes */}
      {ErrorRoute()}

      {/* auth */}
      <Route path="/dashboard/login" element={<LoginPage />} />
    </Routes>
  );
}
