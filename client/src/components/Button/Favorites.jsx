import icons from "../../ultils/icon";

const Favorites = () => {
  const { AiOutlineHeart } = icons;

  return (
    <div>
      <span className="text-gray-400 flex items-center justify-center text-xs sm:text-sm">
        Yêu thích
        <AiOutlineHeart className="text-main ml-1 text-lg sm:text-xl cursor-pointer" />
      </span>
    </div>
  );
};

export default Favorites;
