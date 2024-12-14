import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="container p-0 font-roboto lg:mt-[95px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
