import { Contact } from "../Button/Contact";
import icons from "../../ultils/icon";
import { GroupInput } from "../Input/GroupInput";
import { Account } from "../Button/Account";
import { Cart } from "../Button/Cart";
import { BottomNavigation } from "./BottonNavigation";
import { Link } from "react-router-dom";
import Category from "../Button/Category";

const Navbar = () => {
  const { AiOutlinePhone, BsGeoAlt, BsTruck } = icons;
  return (
    <header className="bg-main sticky top-0 z-50">
      <div className="container text-semi p-3 w-full">
        <nav className="grid grid-flow-col gap-4 items-center">
          <div>
            {/* logo area */}
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Logo
              </span>
            </Link>
          </div>
          <div className="justify-center flex gap-2">
            <Category />
          </div>
          <div>
            <GroupInput />
          </div>

          <div className="flex justify-center gap-2">
            <Contact
              icon={AiOutlinePhone}
              title="Đặt hàng gọi ngay"
              content="1800 1010"
            />
            <Contact icon={BsGeoAlt} content="Cửa hàng gần bạn" />
            <Contact icon={BsTruck} content="Tra cứu đơn hàng" />
            <Link to={"/cart"}>
              <Cart />
            </Link>
            <Link to={"/login"}>
              <Account />
            </Link>
          </div>
        </nav>
        {/* mobile */}
        <BottomNavigation />
      </div>
    </header>
  );
};

export default Navbar;
