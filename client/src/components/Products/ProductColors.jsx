import { products } from "../../data/Product/Products";
import Heading from "../Heading/Heading";

const ProductColors = ({ productId, selectedOption, handleOptionClick }) => {
  const product = products.find((product) => product.id === productId);

  return (
    <>
      <Heading title="Chọn màu" />
      <div className="flex flex-wrap">
        {product.options.map((option, index) => (
          <div
            key={index}
            className={`p-4 m-2 flex flex-col items-center w-[160px] h-10 justify-center border rounded cursor-pointer ${
              option.colors === selectedOption
                ? "border-main text-gray-900"
                : "border-gray-300"
            }`}
            onClick={() => handleOptionClick(option.colors)}
          >
            <p className="text-sm font-bold">{option.colors}</p>
            <p className="text-xs">{option.price.toLocaleString()} đ</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductColors;
