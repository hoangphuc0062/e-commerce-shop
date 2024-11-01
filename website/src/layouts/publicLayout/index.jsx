import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="container p-0 font-roboto ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
