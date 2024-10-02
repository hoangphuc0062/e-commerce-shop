import PropTypes from "prop-types";
const ProductOptions = ({ options, handleOptionClick, selectedOption }) => {
  return (
    <div className="flex flex-wrap">
      {options.map((option, index) => (
        <div
          key={index}
          className={`p-6 m-2 flex flex-col items-center w-52 h-10 justify-center border rounded cursor-pointer ${
            option === selectedOption
              ? "border-main text-gray-900"
              : "border-gray-300"
          }`}
          onClick={() => handleOptionClick(option)}
        >
          <p className="text-[14px] font-bold">
            {option.ram} {option.rom}
          </p>
          <p className="text-[10px]">{option.price.toLocaleString()} đ</p>
        </div>
      ))}
    </div>
  );
};

// PropTypes validation
ProductOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      ram: PropTypes.string.isRequired,
      rom: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      salePrice: PropTypes.number,
    })
  ).isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  selectedOption: PropTypes.object,
};

export default ProductOptions;
