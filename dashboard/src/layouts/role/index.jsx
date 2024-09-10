import NavBar from "../NavBar";
import Navigation from "../Navigation";
import NavigationEdit from "../Navigation/NavigationEdit";

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
      return <Navigation />;
    case "staff":
      return <Navigation />;
    default:
      return null;
  }
};
export default getNavigationByRole;
