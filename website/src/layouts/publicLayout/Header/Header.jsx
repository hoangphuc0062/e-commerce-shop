import { Link } from "react-router-dom";
import { ButtonContact } from "../../../components/Button/ButtonContact";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SearchInput } from "../../../components/Button/SearchInput";

const bottonContacts = [
  {
    iconName: "carbon:phone",
    title: "Gọi ngay",
    content: "0773440062",
  },
  {
    iconName: "carbon:location",
    title: "Cửa hàng gần bạn",
  },
  {
    iconName: "carbon:delivery-truck",
    title: "Tra cứu đơn hàng",
  },
];

export const Header = () => {
  return (
    <>
      {/* desktop header */}
      <header className="hidden lg:block bg-main sticky top-0 z-50">
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
              <button className="flex items-center justify-center text-[12px] bg-hv p-2 rounded-lg">
                <Icon
                  icon="carbon:book"
                  width="2rem"
                  height="2rem"
                  className="mr-2"
                />
                <p className="line-clamp-2">Danh mục</p>
              </button>
              <button className="flex items-center justify-center text-[12px] bg-hv p-2 rounded-lg">
                <Icon
                  icon="carbon:location"
                  width="2rem"
                  height="2rem"
                  className="mr-2"
                />
                <div>
                  <div className="flex">
                    <h1 className="font-semibold">Xem giá tại</h1>
                    <Icon
                      icon="carbon:chevron-down"
                      width="1rem"
                      height="1rem"
                    />
                  </div>
                  <div>
                    <h1>TP.Hồ Chí Minh</h1>
                  </div>
                </div>
              </button>
            </div>
            <div>
              <SearchInput />
            </div>

            <div className="flex gap-1">
              {bottonContacts.map((item, index) => (
                <ButtonContact key={index} {...item} />
              ))}
              <button className="flex items-center justify-center text-[12px] w-[80px] hover:bg-hv p-2 rounded-lg">
                <div className="flex items-center justify-center relative">
                  <Icon icon="carbon:shopping-bag" width="2rem" height="2rem" />
                  <span className="absolute text-[12px] ">0</span>
                </div>
                <p className=" line-clamp-2">Giỏ hàng</p>
              </button>
              <button className="flex flex-col items-center justify-center text-[12px]">
                <Icon
                  icon="carbon:user-avatar"
                  width="1.5rem"
                  height="1.5rem"
                />
                <p className="line-clamp-2">Đăng nhập</p>
              </button>
            </div>
          </nav>
          {/* mobile */}
          {/* <BottomNavigation /> */}
        </div>
      </header>
      {/* // mobile header */}
      <header className="lg:hidden bg-main sticky top-0 z-50 p-1">
        <nav className="flex flex-col text-semi ">
          <Link to={"/"} className="flex justify-center w-full">
            Logo
          </Link>

          <div className="flex justify-between">
            <div className="w-full">
              <SearchInput />
            </div>

            <div className="flex gap-1">
              <button className="flex items-center justify-center text-[12px] w-[80px] hover:bg-hv p-2 rounded-lg">
                <div className="flex items-center justify-center relative">
                  <Icon icon="carbon:shopping-bag" width="2rem" height="2rem" />
                  <span className="absolute text-[12px] ">0</span>
                </div>
                <p className=" line-clamp-2">Giỏ hàng</p>
              </button>
            </div>
          </div>
        </nav>
        {/* mobile */}
        {/* <BottomNavigation /> */}
      </header>
    </>
  );
};
