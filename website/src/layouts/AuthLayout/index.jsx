import { Header } from "./Header/Header";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <div className="">
        <Header />
      </div>
      <div className="container p-0 font-roboto lg:mt-[95px]">
        <Outlet />
      </div>
    </>
  );
};
