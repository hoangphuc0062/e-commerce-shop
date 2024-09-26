/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import ROLE from "../config/role";

const PrivateRoute = ({ roles, element }) => {
  const role = Cookies.get("role");
  const userRole = ROLE[role];
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
