import { products } from "../../data/Product/Products";
import Heading from "../Heading/Heading";

const ProductColors = ({ productId, selectedOption, handleOptionClick }) => {
  const product = products.find((product) => product.id === productId);

  if (!product || !product.options) return null;

  return (
    <>
      <Heading title="Chọn màu" />
      <div className="flex flex-wrap w-full">
        {product.options.map((option, index) => (
          <div
            key={index}
            className={`p-4 m-2 flex flex-col items-center justify-center border rounded cursor-pointer 
              ${
                option.colors === selectedOption
                  ? "border-main text-gray-900"
                  : "border-gray-300"
              }
              sm:w-1/2 md:w-1/3 lg:w-1/4
            `}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductColors;
