import PropTypes from "prop-types";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/slices/auth";
import Cookies from "js-cookie";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loginAuth, setLoginAuth] = useState(false);
  const token = Cookies.get("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoginAuth(true);
      dispatch(getMe());
    } else {
      setLoginAuth(false);
    }
  }, [token, dispatch]);

  const value = useMemo(
    () => ({ user, setUser, loginAuth, setLoginAuth }),
    [user, loginAuth]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
