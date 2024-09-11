import React from "react";
import icons from "../../ultils/icon";
import { BottomButton } from "../Button/BottomButton";
export const BottomNavigation = () => {
  const buttons = [
    {
      name: "Trang chủ",
      to: "/",
      icon: icons.CiHome,
    },
    {
      name: "Danh mục",
      to: "/category",
      icon: icons.CiViewList,
    },
    {
      name: "Yêu thích",
      to: "/favorite",
      icon: icons.CiHeart,
    },
    {
      name: "Tài khoản",
      to: "/account",
      icon: icons.CiUser,
    },
  ];
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full p-4 lg:hidden bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {buttons.map((button, index) => (
          <BottomButton
            key={index}
            icon={button.icon}
            name={button.name}
            to={button.to}
          />
        ))}
      </div>
    </div>
  );
};
