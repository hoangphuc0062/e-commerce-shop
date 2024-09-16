/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ roles, element }) => {
  const { userRole } = useAuth();

  // Kiểm tra nếu userRole là null hoặc undefined
  if (!userRole) {
    // console.error("No userRole found, redirecting to unauthorized.");
    return <Navigate to="/unauthorized" />;
  }

  // Log giá trị của roles và userRole để kiểm tra
  // console.log(
  //   "User Role (trimmed and lowercased):",
  //   userRole.trim().toLowerCase()
  // );
  // console.log(
  //   "Allowed Roles (trimmed and lowercased):",
  //   roles.map((role) => role.trim().toLowerCase())
  // );

  // Kiểm tra nếu userRole không nằm trong danh sách roles cho phép
  if (
    !roles
      .map((role) => role.trim().toLowerCase())
      .includes(userRole.trim().toLowerCase())
  ) {
    // console.log("Unauthorized access for role:", userRole);
    return <Navigate to="/unauthorized" />;
  }

  // Render component được truyền qua prop `element`
  return element;
};

export default PrivateRoute;
