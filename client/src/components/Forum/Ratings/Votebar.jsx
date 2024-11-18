import { useEffect, useRef } from "react";
import icons from "../../../ultils/icon";

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const { FaStar } = icons;
  const percentRef = useRef();
  useEffect(() => {
    const percent = ratingCount
      ? Math.round((ratingCount / ratingTotal) * 100)
      : 0;
    percentRef.current.style.width = `${percent}%`;
  }, [ratingTotal, ratingCount]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span>{number}</span>
        <FaStar color="#FFD700" />
      </div>
      <div className="w-[75%]">
        <div className="h-[6px] bg-gray-200 rounded-full relative w-full">
          <div
            ref={percentRef}
            className="absolute left-0 bg-main h-full rounded-full"
          ></div>
        </div>
      </div>
      <div className="flex justify-end lg:text-xs text-[10px] w-[15%] text-gray-400">{`${
        ratingCount || 0
      } đánh giá`}</div>
    </div>
  );
};

export default Votebar;
