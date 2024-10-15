import { useState } from "react";
import Heading from "../Heading/Heading";

const ProductColors = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const isSelected = (option) => {
    return option === selectedOption;
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Heading title="Chọn màu sắc" />
      <div className="flex flex-wrap w-full gap-2">
        {options?.map((option, index) => (
          <div
            key={index}
            className="p-2 min-w-[calc(50%-0.5rem)] lg:min-w-[calc(25%-0.5rem)] lg:flex-1"
          >
            <div
              className={`flex items-center justify-center border rounded cursor-pointer w-full h-14 lg:h-14 ${
                isSelected(option)
                  ? "border-main text-gray-900"
                  : "border-gray-300"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <img
                src={option.icon}
                alt={option.colors}
                className="w-10 h-10 mb-1 rounded"
              />
              <div className="pl-2 flex flex-col">
                <p className="text-sm font-bold">{option.colors}</p>
                <p className="text-xs">{option.price.toLocaleString()} đ</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
