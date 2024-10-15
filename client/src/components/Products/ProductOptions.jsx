import Heading from "../Heading/Heading";
import OptionCard from "../Card//OptionsCard";

const ProductOptions = ({ options, handleOptionClick, selectedOption }) => {
  if (!options) return null;

  return (
    <>
      <Heading title="Chọn dung lượng" />
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <OptionCard
            key={index}
            option={option}
            isSelected={option === selectedOption}
            onClick={() => handleOptionClick(option)}
          >
            <p className="text-sm font-bold">
              {option.ram} {option.rom}
            </p>
            <p className="text-xs">{option.price.toLocaleString()} đ</p>
          </OptionCard>
        ))}
      </div>
    </>
  );
};

export default ProductOptions;
