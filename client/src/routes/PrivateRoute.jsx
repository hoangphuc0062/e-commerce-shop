import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  // Example authentication check; replace with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate an authentication check
    // Replace with actual authentication check (e.g., check token in local storage)
    const checkAuth = async () => {
      // Simulate async auth check
      const authStatus = await new Promise((resolve) =>
        setTimeout(() => resolve(true), 1000)
      );
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;
