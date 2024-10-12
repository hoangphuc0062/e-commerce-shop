import { useState } from "react";
import icons from "../../ultils/icon";

const Favorites = () => {
  const { AiOutlineHeart, AiFillHeart } = icons;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <span className="text-gray-400 flex items-center justify-center text-xs sm:text-sm">
        Yêu thích
        <span
          className="ml-1 cursor-pointer text-lg sm:text-xl flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <AiFillHeart className="text-main" />
          ) : (
            <AiOutlineHeart className="text-main" />
          )}
        </span>
      </span>
    </div>
  );
};

export default Favorites;
