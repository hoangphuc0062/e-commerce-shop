import { useState } from "react";
import icons from "../../ultils/icon";

const SortOptions = () => {
  const { FaSortAmountDownAlt, FaSortAmountDown, FaPercent, IoEye } = icons;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSortOptionClick = (option) => {
    setSelectedOption(option);
    console.log(`Selected sort option: ${option}`);
  };

  const getButtonClass = (option) => {
    return selectedOption === option
      ? "border-2 border-main bg-blue-50 p-2 rounded text-gray-800 flex items-center space-x-2"
      : "border-2 border-gray-300 p-2 rounded text-gray-800 flex items-center space-x-2";
  };

  return (
    <div className="flex flex-wrap space-x-2 items-center">
      <button
        className={getButtonClass("Giá Cao - Thấp")}
        onClick={() => handleSortOptionClick("Giá Cao - Thấp")}
      >
        <FaSortAmountDown />
        <span>Giá Cao - Thấp</span>
      </button>
      <button
        className={getButtonClass("Giá Thấp - Cao")}
        onClick={() => handleSortOptionClick("Giá Thấp - Cao")}
      >
        <FaSortAmountDownAlt />
        <span>Giá Thấp - Cao</span>
      </button>
      <button
        className={getButtonClass("Khuyến Mãi Hot")}
        onClick={() => handleSortOptionClick("Khuyến Mãi Hot")}
      >
        <FaPercent />
        <span>Khuyến Mãi Hot</span>
      </button>
      <button
        className={getButtonClass("Xem nhiều")}
        onClick={() => handleSortOptionClick("Xem nhiều")}
      >
        <IoEye />
        <span>Xem nhiều</span>
      </button>
    </div>
  );
};

export default SortOptions;
