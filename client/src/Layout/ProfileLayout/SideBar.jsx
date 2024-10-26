import { useState } from "react";
import { Link } from "react-router-dom";

const tabs = [
  {
    id: "1",
    name: "Trang chủ",
    link: "",
  },
  {
    id: "2",
    name: "Tài khoản của bạn",
    link: "account",
  },
  {
    id: "3",
    name: "Coupon",
    link: "coupon",
  },
  {
    id: "4",
    name: "Địa chỉ",
    link: "address",
  },
  {
    id: "6",
    name: "Quản lý đơn hàng",
    link: "order",
  },
];

export const SideBar = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
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
                {tab.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/"
              className="flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 hover:text-main"
            >
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
                <span className="text-xs">{tab.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center gap-2 p-[5px] text-gray-700 hover:bg-gray-100 rounded hover:text-main"
            >
              <span className="text-xs">Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
