import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { loginAuth } = useContext(UserContext);

  if (!loginAuth) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
