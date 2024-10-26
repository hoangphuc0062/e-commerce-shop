/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Context
const AuthContext = createContext();

// Provider để bọc ứng dụng của bạn
export const AuthProvider = ({ children }) => {
  const [islogin, setIslogin] = useState(false);
  const [customerData, setCustomerData] = useState({});

  const login = () => {
    setIslogin(true);
    // setCustomerData(customerData);
  };

  const logout = () => {
    setIslogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        islogin,
        login,
        logout,
        customerData,
        setCustomerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
