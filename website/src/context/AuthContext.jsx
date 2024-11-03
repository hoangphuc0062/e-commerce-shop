import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../redux/slices/auth";
import Cookies from "js-cookie";

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
