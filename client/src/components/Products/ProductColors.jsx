import { products } from "../../data/Product/Products";
import Heading from "../Heading/Heading";
import OptionCard from "../Card/OptionsCard";

const ProductColors = ({ productId, selectedOption, handleOptionClick }) => {
  const product = products.find((product) => product.id === productId);

  if (!product || !product.options) return null;

  return (
    <>
      <Heading title="Chọn màu" />
      <div className="flex flex-wrap w-full">
        {product.options.map((option, index) => (
          <OptionCard
            key={index}
            option={option}
            isSelected={option.colors === selectedOption}
            onClick={() => handleOptionClick(option.colors)}
          >
            <div className="flex items-center justify-center">
              <img
                src={option.icon}
                alt={option.colors}
                className="w-12 h-12 object-cover p-2"
              />
              <div className="flex flex-col text-center">
                <p className="text-sm font-bold">{option.colors}</p>
                <p className="text-sm">{option.price.toLocaleString()} đ</p>
              </div>
            </div>
          </OptionCard>
        ))}
      </div>
    </>
  );
};

export default ProductColors;
