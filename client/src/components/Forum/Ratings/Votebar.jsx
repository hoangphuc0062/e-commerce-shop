import { useEffect, useRef } from "react";
import icons from "../../../ultils/icon";

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const { FaStar } = icons;
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - Math.round(
      (ratingTotal * 100) / ratingCount
    )}%`;
  }, [ratingTotal, ratingCount]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1">
        <span>{number}</span>
        <FaStar color="#FFD700" />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[6px] bg-gray-200 rounded-full relative">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-main rounded-full"
          ></div>
        </div>
      </div>
      <div className="flex justify-end text-xs w-[15%] text-gray-400">{`${
        ratingCount || 0
      } đánh giá`}</div>
    </div>
  );
};

export default Votebar;
