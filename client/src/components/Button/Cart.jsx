import React from "react";
import icons from "../../ultils/icon";

export const Cart = (number) => {
  const { AiOutlineShoppingCart } = icons;
  return (
    <button
      type="button"
      className="relative flex flex-col items-center font-medium text-center "
    >
      <div className="text-2xl">
        <AiOutlineShoppingCart />
      </div>
      <div className="text-[10px] ">Giỏ Hàng</div>
      <div className="absolute flex items-center justify-center text-[10px] w-6 h-6 font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
        20
      </div>
    </button>
  );
};
