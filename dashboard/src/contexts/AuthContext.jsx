/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Tạo Context
const AuthContext = createContext();

// Provider để bọc ứng dụng của bạn
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("role"))
  ); // Vai trò người dùng được lưu trong localStorage

  const setRole = (role) => {
    localStorage.setItem("role", role);
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ userRole, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
