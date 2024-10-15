import icons from "../../ultils/icon";

export const Compare = () => {
  const { FaPlus } = icons;
  return (
    <button
      className="flex items-center gap-1 border border-main text-main bg-white p-2 rounded
      sm:p-1 md:p-2 lg:p-3
      sm:text-xs md:text-sm lg:text-base
      transition-all duration-300 ease-in-out hover:bg-main hover:text-white
    "
    >
      <FaPlus />
      <span className="hidden sm:inline">So sánh</span>{" "}
      {/* Hide text on very small screens */}
    </button>
  );
};
