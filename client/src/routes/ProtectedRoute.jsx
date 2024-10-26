import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { isLogin } = useAuth();

  if (isLogin === "false") {
    return <Navigate to="/login" />;
  }
  return children;
};
