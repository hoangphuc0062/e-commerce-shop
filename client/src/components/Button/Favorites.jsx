import icons from "../../ultils/icon";
const Favorites = () => {
  const { AiOutlineHeart } = icons;
  return (
    <div>
      <span className="text-gray-400 flex items-center justify-center ">
        Yêu thích
        <AiOutlineHeart className="text-main ml-1 text-2xl cursor-pointer" />
      </span>
    </div>
  );
}

export default Favorites
