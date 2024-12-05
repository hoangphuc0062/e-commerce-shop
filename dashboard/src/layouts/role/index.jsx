import NavigationEdit from "../Navigation/menu/admin";
import Navigation from "../Navigation/menu/superadmin";
import NavBar from "../NavBar";
import Customer from "../Navigation/menu/customer";
import Staff from "../Navigation/menu/staff";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";
import { handleToast } from "../../utils/toast";

const getNavigationByRole = (role) => {
  const { setLoginAuth } = useContext(UserContext);

  switch (role) {
    case "superadmin":
      return (
        <>
          <Navigation />
          <NavBar />
        </>
      );
    case "admin":
      return (
        <>
          <NavigationEdit />
          <NavBar />
        </>
      );
    case "author":
      return (
        <>
          <Customer />
          <NavBar />
        </>
      );
    case "staff":
      return (
        <>
          <Staff />
          <NavBar />
        </>
      );
    default:
      setLoginAuth(false);
      handleToast("error", "Vui lòng đăng nhập để tiếp tục.");
      return <Navigate to="/" />;
  }
};

export default getNavigationByRole;
