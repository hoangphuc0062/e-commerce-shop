const ProductOptions = ({ options, handleOptionClick, selectedOption }) => {
  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => (
        <div
          key={index}
          className={`p-4 m-2 flex flex-col items-center w-[160px] h-10 justify-center border rounded cursor-pointer ${
            option === selectedOption
              ? "border-main text-gray-900"
              : "border-gray-300"
          }`}
          onClick={() => handleOptionClick(option)}
        >
          <p className="text-sm font-bold">
            {option.ram} {option.rom}
          </p>
          <p className="text-xs">{option.price.toLocaleString()} đ</p>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
