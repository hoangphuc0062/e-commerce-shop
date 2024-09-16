import { Outlet } from "react-router-dom";

import Header from "./header/header";
import Footer from "./footer/footer";
export default function PublicLayout() {
  return (
    <>
      <Header />
      <></>
      <main className="font-roboto bg-grayColor">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
