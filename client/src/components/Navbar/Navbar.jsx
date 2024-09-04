import { Contact } from "../Button/Contact";
import icons from "../../ultils/icon";
import { GroupInput } from "../Input/GroupInput";
import { Account } from "../Button/Account";
import { Cart } from "../Button/Cart";

const Navbar = () => {
  const { AiOutlinePhone, BsGeoAlt, BsTruck } = icons;
  return (
    <div className="container">
      <nav className="grid grid-flow-col gap-4 items-center">
        <div>
          {/* logo area */}
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Logo
            </span>
          </a>
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
          <Cart />
          <Account />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
