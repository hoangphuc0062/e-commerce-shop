import Navigation from "../Navigation/menu/superadmin";
import NavBar from "../NavBar";
import NavigationAdmin from "../Navigation/menu/admin";
import NavigationAuthor from "../Navigation/menu/author";
import NavigationStaff from "../Navigation/menu/staff";

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
          <NavigationAdmin />
          <NavBar />
        </>
      );
    case "author":
      return (
        <>
          <NavigationAuthor />
          <NavBar />
        </>
      );
    case "staff":
      return (
        <>
          <NavigationStaff />
          <NavBar />
        </>
      );
    default:
      return null;
  }
};
export default getNavigationByRole;
