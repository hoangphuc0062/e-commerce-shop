/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ roles, element }) => {
  const { userRole } = useAuth();

  if (!userRole) {
    return <Navigate to="/unauthorized" />;
  }

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
