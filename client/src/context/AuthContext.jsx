/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Tạo Context
const AuthContext = createContext();

export const AuthProvider = ({ children, reduxCustomerData, isLoginned }) => {
  const [islogin, setIslogin] = useState(isLoginned);
  const [customerData, setCustomerData] = useState(reduxCustomerData);

  // Đồng bộ hóa trạng thái với Redux
  useEffect(() => {
    setIslogin(isLoginned);
    setCustomerData(reduxCustomerData);
  }, [isLoginned, reduxCustomerData]);

  const login = () => {
    setIslogin(true);
  };

  const logout = () => {
    setIslogin(false);
    setCustomerData({});
    Cookies.remove("access_token");
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
