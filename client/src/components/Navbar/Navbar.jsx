
import { Contact } from "../Button/Contact";
import icons from "../../ultils/icon";

const Navbar = () => {
  const { AiOutlinePhone, BsGeoAlt, BsTruck, AiOutlineShoppingCart } = icons;
  return (
    <div className="container">
      <nav className=" grid grid-flow-col auto-cols-max gap-4 items-center">
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
          {/* Khu vực tìm kiếm */}
        </div>

        <div className="flex gap-2">
          <Contact icon={AiOutlinePhone} title="Đặt hàng" content="1800 1010" />
          <Contact icon={BsGeoAlt} title="Cửa hàng gần bạn" />
          <Contact icon={BsTruck} title="Tra cứu đơn hàng" />
          <Contact icon={AiOutlineShoppingCart} title="Giỏ hàng" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
