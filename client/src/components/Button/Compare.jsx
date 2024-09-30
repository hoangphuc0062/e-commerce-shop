import icons from "../../ultils/icon";

export const Compare = () => {
  const { FaPlus } = icons;
  return (
    <button className="flex items-center gap-2 border border-main text-main bg-white p-2 rounded ">
      <FaPlus />
      So sánh
    </button>
  );
};
