import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts";
import AdminRoute from "./AdminRoute";
import ErrorRoute from "./ErrorRoute";
import EditorRoute from "./EditorRoute";
import PrivateRoute from "./PrivateRoute";
import Testform from "../pages/testform";
import UploadImage from "../pages/TestFilebase";
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

      <Route path="/dashboard/test" element={<Testform />} />
      <Route path="/dashboard/uploadImage" element={<UploadImage />} />
    </Routes>
  );
}
