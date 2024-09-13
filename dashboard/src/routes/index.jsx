import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts";
import AdminRoute from "./AdminRoute";
import ErrorRoute from "./ErrorRoute";
import EditorRoute from "./EditorRoute";
import PrivateRoute from "./PrivateRoute";
export default function RootRouter() {
  return (
    <Routes>
      {/* Admin layout wrapper */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            element={<AdminLayout />}
            roles={["customer", "staff", "admin", "superadmin"]}
          />
        }
      >
        {/* superadmin routes */}
        {AdminRoute()}

        {/* admin routes */}
        {EditorRoute()}
      </Route>

      {/* Error routes */}
      {ErrorRoute()}
    </Routes>
  );
}
