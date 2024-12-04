import { Link, useLocation } from "react-router-dom";
import { ButtonContact } from "../../../components/Button/ButtonContact";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SearchInput } from "../../../components/Button/SearchInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserMenu } from "./UserMenu";
import CartButton from "./CartButton";
import Drawer from "@mui/material/Drawer";
import { resetState } from "../../../redux/slices/auth";
import { getWebConfig } from "../../../redux/slices/webConfig";

const bottonContacts = [
  {
    iconName: "carbon:phone",
    title: "Gọi ngay",
    content: "0773440062",
    link: "tel:0773440062",
  },
  {
    iconName: "carbon:location",
    title: "Cửa hàng gần bạn",
  },
  {
    iconName: "carbon:delivery-truck",
    title: "Tra cứu đơn hàng",
    link: "/look-up-order",
  },
];

export const Header = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [dataWebConFig, setDataWbeConFig] = useState([]);
  const status = useSelector((state) => state.auth?.statusGetMe || "idle");
  const user = useSelector((state) => state.auth?.data?.rs || null);
  const statusGetCart = useSelector((state) => state.auth.statusGetCart);
  const datacard = useSelector((state) => state.auth.dataCart);
  const [Card, setDataCard] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const statusWebConFig = useSelector((state) => state.webConfig.status);
  const webConfig = useSelector((state) => state.webConfig.data);

  useEffect(() => {
    const currentPath = window.location.pathname;

    switch (currentPath) {
      case "/":
        setActiveIndex(0);
        break;
      case "/look-up-order":
        setActiveIndex(2);
        break;
      case "/login":
      case "/profile":
        setActiveIndex(3);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [location]);

  useEffect(() => {
    if (statusGetCart === "success" && datacard) {
      setDataCard(datacard);
    }
    dispatch(resetState({ key: "statusGetCart", value: "idle" }));
  }, [statusGetCart, datacard, dispatch]);

  useEffect(() => {
    dispatch(getWebConfig());
  }, [dispatch]);

  useEffect(() => {
    if (statusWebConFig === "succeeded") {
      setDataWbeConFig(webConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusWebConFig, dataWebConFig]);

  useEffect(() => {
    if (status === "success") {
      setData(user);
    } else {
      setData(null);
    }
  }, [status, user]);

  return (
    <>
      {/* desktop header */}
      <header className="hidden lg:block bg-main sticky top-0 z-50">
        <div className="container text-semi p-3 w-full">
          <nav className="flex gap-4 items-center w-full">
            <div className="flex w-1/2 xl:w-7/12 2xl:w-2/3 justify-center items-center gap-2">
              <Link
                to="/"
                className="flex items-center w-1/3 space-x-3 rtl:space-x-reverse"
              >
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {dataWebConFig && (
                    <img src={dataWebConFig[0]?.logo} alt="" width={120} />
                  )}
                </span>
              </Link>
              <button className="flex items-center w-1/3 justify-center min-h-[54px] text-[12px] bg-hv p-2 rounded-lg">
                <Icon
                  icon="carbon:book"
                  width="2rem"
                  height="2rem"
                  className="mr-2"
                />
                <p className="line-clamp-2">Danh mục</p>
              </button>
              <button className="flex items-center justify-center text-[12px] min-h-[54px] min-w-[140px] bg-hv p-2 rounded-lg">
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
              <SearchInput />
            </div>

            {/* Contacts và User */}
            <div className="flex md:w-1/2 xl:w-5/12  2xl:w-1/3 items-center justify-between gap-1">
              {bottonContacts.map((item, index) => (
                <ButtonContact key={index} {...item} />
              ))}

              {Card && <CartButton data={Card} />}
              <div>
                <UserMenu data={data} />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile header */}
      <header className="lg:hidden bg-main sticky top-0 z-50 p-2">
        <nav className="flex text-semi items-center gap-2">
          <Link to="/" className="text-center w-fit">
            {dataWebConFig && (
              <img src={dataWebConFig[0]?.logoMobie} alt="" width={50} />
            )}
          </Link>
          <div className="w-full">
            <SearchInput />
          </div>
          <div className="flex gap-1">
            <button className="relative flex items-center justify-center text-[12px] w-fit hover:bg-hv p-2 rounded-lg">
              <Link to="cart" className="flex items-center justify-center">
                <Icon icon="uil:cart" width="2rem" height="2rem" />
                <span className="absolute text-[10px] top-1 right-1 bg-red-600 rounded-full p-1 h-5 w-5">
                  {Card.length}
                </span>
              </Link>
            </button>
          </div>
        </nav>
      </header>
      {/* end header */}
      {/* mobile navigation */}
      <header className="fixed bottom-0 z-50 w-full lg:hidden">
        <nav className="bg-white h-[64px] flex shadow-lg font-bold">
          <Link
            onClick={() => setActiveIndex(0)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeIndex === 0 ? "text-main" : ""
            } `}
            to="/"
          >
            <Icon icon="carbon:home" width="1.5rem" height="1.5rem" />
            <p className="text-[10px]">Trang chủ</p>
          </Link>
          <Link
            onClick={() => {
              setActiveIndex(1);
              setIsDrawerOpen(true);
            }}
            className={`flex flex-col items-center justify-center w-full h-full  ${
              activeIndex === 1 ? "text-main" : ""
            } `}
          >
            <Icon icon="carbon:book" width="1.5rem" height="1.5rem" />
            <p className="text-[10px]">Danh mục</p>
          </Link>
          <Link
            onClick={() => setActiveIndex(2)}
            className={`flex flex-col items-center justify-center w-full h-full  ${
              activeIndex === 2 ? "text-main" : ""
            }`}
            to="/look-up-order"
          >
            <Icon icon="carbon:location" width="1.5rem" height="1.5rem" />
            <p className="text-[10px]">Đơn hàng</p>
          </Link>
          {data ? (
            <Link
              to={"/profile"}
              onClick={() => setActiveIndex(3)}
              className={`flex flex-col items-center justify-center w-full h-full  ${
                activeIndex === 3 ? "text-main" : ""
              } `}
            >
              <UserMenu data={data} />
            </Link>
          ) : (
            <Link
              onClick={() => setActiveIndex(3)}
              className={`flex flex-col items-center justify-center w-full h-full  ${
                activeIndex === 3 ? "text-main" : ""
              } `}
              to="/login"
            >
              <Icon icon="carbon:user-avatar" width="1.5rem" height="1.5rem" />
              <p className="text-[10px]">Đăng nhập</p>
            </Link>
          )}
        </nav>
      </header>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <div className="w-[250px] p-4">
          <h2 className="text-lg font-semibold mb-4">Danh mục</h2>
          <ul>drawer here</ul>
        </div>
      </Drawer>
    </>
  );
};
