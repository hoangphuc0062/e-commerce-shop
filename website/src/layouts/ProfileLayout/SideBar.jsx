import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";

const tabs = [
  {
    id: "1",
    name: "Trang chủ",
    link: "",
    icon: "bx:bx-home",
  },
  {
    id: "2",
    name: "Tài khoản của bạn",
    link: "account",
    icon: "bx:bx-user",
  },
  {
    id: "3",
    name: "Coupon",
    link: "coupon",
    icon: "bx:bx-bookmark",
  },
  {
    id: "4",
    name: "Địa chỉ",
    link: "address",
    icon: "bx:bx-map",
  },
  {
    id: "6",
    name: "Quản lý đơn hàng",
    link: "order",
    icon: "bx:bx-list-ul",
  },
  {
    id: "7",
    name: "Đổi mật khẩu",
    link: "change-password",
    icon: "material-symbols:password",
  },
];

export const SideBar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* vertical tabs */}
      <nav className="hidden md:block p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={tab.link}
                className={`flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 hover:text-main ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-main outline outline-main outline-offset-1 outline-1 rounded-sm font-semibold"
                    : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {<Icon icon={tab.icon} width={20} />}
                {tab.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              onClick={handleLogout}
              className="flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 hover:text-main"
            >
              <Icon icon="bx:bx-log-out" />
              Đăng xuất
            </Link>
          </li>
        </ul>
      </nav>

      {/* horizontal tabs */}

      <nav className="md:hidden w-full bg-white p-4 z-50 overflow-x-auto whitespace-nowrap">
        <ul className="flex space-x-4">
          {tabs.map((tab) => (
            <li key={tab.id} className="inline-block shrink-0">
              <Link
                to={tab.link}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-2 p-[5px] text-gray-700 hover:bg-gray-100 rounded hover:text-main
                `}
              >
                <span className="text-xs flex ">
                  <Icon icon={tab.icon} width={16} />
                  {<p className="text-xs ml-1 line-clamp-1">{tab.name}</p>}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              onClick={handleLogout}
              className="flex flex-col items-center gap-2 p-[5px] text-gray-700 hover:bg-gray-100 rounded hover:text-main"
            >
              <div className="flex">
                <Icon icon="bx:bx-log-out" />
                <span className="text-xs ml-1">Đăng xuất</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
