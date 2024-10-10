/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import ROLE from "../config/role";

const PrivateRoute = ({ roles = [], element }) => {
  const roleFromCookie = Cookies.get("role");
  const userRole = roleFromCookie
    ? ROLE[roleFromCookie]?.trim().toLowerCase()
    : null;

  // If no user role exists, redirect to login
  if (!userRole) {
    return <Navigate to="/" />;
  }

  // Convert the roles array to lowercase once for comparison
  const allowedRoles = roles.map((role) => role?.trim().toLowerCase());

  // Check if the user has one of the required roles
  const isAuthorized = allowedRoles.includes(userRole);

  // If the user isn't authorized, redirect them to the unauthorized page
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" />;
  }

  // If authorized, render the element
  return element;
};

export default PrivateRoute;
