import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="container font-roboto ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
