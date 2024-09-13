import NavigationEdit from "../Navigation/menu/admin";
import Navigation from "../Navigation/menu/superadmin";
import NavBar from "../NavBar";
import Customer from "../Navigation/menu/customer";
import Staff from "../Navigation/menu/staff";

const getNavigationByRole = (role) => {
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
    case "customer":
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
      return null;
  }
};
export default getNavigationByRole;
