import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export const ProfileLayout = () => {
  return (
    <div className="container p-2">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 shadow-lg rounded-lg mr-1">
          <SideBar />
        </div>

        <div className="w-full h-[100vh] md:w-5/6 ml-1 shadow-lg p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
