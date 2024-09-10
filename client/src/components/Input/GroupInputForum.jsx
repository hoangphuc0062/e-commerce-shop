import icons from "../../ultils/icon";

const GroupInputForum = () => {
  const { AiOutlineSearch } = icons;
  return (
    <>
      <div className="relative flex items-center w-1/2">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-white rounded-full py-2 px-4 pr-10 w-full focus:outline-none"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 text-lg sm:text-xl">
          <AiOutlineSearch className="text-gray-400" />
        </button>
      </div>
      ;
    </>
  );
};

export default GroupInputForum;
