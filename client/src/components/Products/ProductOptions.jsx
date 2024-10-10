import Heading from "../Heading/Heading";

const ProductOptions = ({ options, handleOptionClick, selectedOption }) => {
  if (!options) return null;
  return (
    <>
      <Heading title="Chọn dung lượng" />
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <div
            key={index}
            className={`p-4 m-2 flex flex-col items-center justify-center border rounded cursor-pointer w-full 
              ${
                option === selectedOption
                  ? "border-main text-gray-900"
                  : "border-gray-300"
              }
              sm:w-1/2 md:w-1/3 lg:w-1/4
            `}
            onClick={() => handleOptionClick(option)}
          >
            <p className="text-sm font-bold">
              {option.ram} {option.rom}
            </p>
            <p className="text-xs">{option.price.toLocaleString()} đ</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductOptions;
