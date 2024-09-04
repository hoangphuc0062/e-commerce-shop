import React from "react";
import icons from "../../ultils/icon";

export const Cart = (number) => {
  const { AiOutlineShoppingCart } = icons;
  return (
    <button
      type="button"
      className="relative flex flex-col items-center  text-center hover:bg-hv word-break p-2 rounded "
    >
      <div className="text-2xl">
        <AiOutlineShoppingCart />
      </div>
      <div className="text-xs ">Giỏ Hàng</div>
      <div className="absolute flex items-center justify-center text-[10px] w-6 h-6 font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
        20
      </div>
    </button>
  );
};
