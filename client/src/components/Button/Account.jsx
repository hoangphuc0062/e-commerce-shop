import React from "react";
import icons from "../../ultils/icon";

export const Account = () => {
  const { CiUser } = icons;
  return (
    <button className="text-xs text-center">
      <div className="flex flex-col items-center ml-2 ">
        <div className="text-2xl">
          <CiUser />
        </div>
        <div className="text-[10px] ">Đăng nhập</div>
      </div>
    </button>
  );
};
