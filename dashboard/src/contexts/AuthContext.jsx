/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/slices/staff";
import PropTypes from "prop-types";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loginAuth, setLoginAuth] = useState(false);
  const token = Cookies.get("accessToken");
  const dispatch = useDispatch();

  useMemo(() => {
    if (token) {
      setLoginAuth(true);
      dispatch(getMe());
    }
  }, [token, dispatch]);

  const value = useMemo(
    () => ({ user, setUser, loginAuth, setLoginAuth }),
    [user, setUser, loginAuth, setLoginAuth]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { UserContext, UserProvider };
