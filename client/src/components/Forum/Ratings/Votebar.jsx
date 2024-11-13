import { useRef, useEffect } from "react";
import icons from "../../../ultils/icon";
const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const { FaStar } = icons;
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${
      100 - Math.round((ratingCount * 100) / ratingTotal)
    }%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm">
        <span className="text-xl">{number}</span>
        <FaStar color="yellow" />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-2 bg-gray-200 rounded-full relative">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-main/80 rounded-full"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-xs text-gray-400">
        {`${ratingCount || 0} đánh giá`}
      </div>
    </div>
  );
};

export default Votebar;
