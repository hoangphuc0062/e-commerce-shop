import { Link } from "react-router-dom";
import { ButtonContact } from "../../../components/Button/ButtonContact";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SearchInput } from "../../../components/Button/SearchInput";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserMenu } from "./UserMenu";
import CartButton from "./CartButton";

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

const datacard = [
  {
    id: 1,
    name: "Áo thun nam",
    price: 100000,
    priceSale: 80000,
    quantity: 1,
    image: "https://pos.nvncdn.com/778773-105877/ps/20240914_4K1dgEuJzN.jpeg",
  },
  {
    id: 2,
    name: "Áo thun nữ",
    price: 120000,
    priceSale: 100000,
    quantity: 1,
    image: "https://pos.nvncdn.com/778773-105877/ps/20240914_4K1dgEuJzN.jpeg",
  },
];

export const Header = () => {
  const [data, setData] = useState(null);
  const status = useSelector((state) => state.auth?.statusGetMe || "idle");
  const user = useSelector((state) => state.auth?.data?.rs || null);

  useEffect(() => {
    setData(status === "success" ? user : null);
  }, [status, user]);

  return (
    <>
      {/* desktop header */}
      <header className="hidden lg:block bg-main sticky top-0 z-50">
        <div className="container text-semi p-3 w-full">
          <nav className="grid grid-flow-col gap-4 items-center">
            {/* Logo */}
            <div>
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Logo
                </span>
              </Link>
            </div>

            {/* Danh mục và Vị trí */}
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

            {/* Search Input */}
            <div>
              <SearchInput />
            </div>

            {/* Contacts và User */}
            <div className="flex gap-1 items-center">
              {bottonContacts.map((item, index) => (
                <ButtonContact key={index} {...item} />
              ))}

              <div>
                <CartButton data={datacard} />
              </div>
              <div>
                <UserMenu data={data} />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile header */}
      <header className="lg:hidden bg-main sticky top-0 z-50 p-1">
        <nav className="flex flex-col text-semi">
          <Link to="/" className="flex justify-center w-full">
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
                  <span className="absolute text-[12px]">0</span>
                </div>
                <p className="line-clamp-2">Giỏ hàng</p>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
