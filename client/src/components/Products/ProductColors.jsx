import PropTypes from "prop-types";
import { products } from "../../data/Product/Products";
import Heading from "../Heading/Heading";

const ProductColors = ({ productId, selectedOption, handleOptionClick }) => {
  const product = products.find((product) => product.id === productId);

  return (
    <>
      <Heading title="Chọn màu để xem giá" />
      <div className="flex flex-wrap">
        {product.options.map((option, index) => (
          <div
            key={index}
            className={`p-6 m-2 flex flex-col items-center w-52 h-10 justify-center border rounded cursor-pointer ${
              option.colors === selectedOption
                ? "border-main text-gray-900"
                : "border-gray-300"
            }`}
            onClick={() => handleOptionClick(option.colors)}
          >
            <p className="text-[14px] font-bold">{option.colors}</p>
            <p className="text-[10px]">{option.price.toLocaleString()} đ</p>
          </div>
        ))}
      </div>
    </>
  );
};

ProductColors.propTypes = {
  productId: PropTypes.number.isRequired, // ID của sản phẩm
  selectedOption: PropTypes.string, // Màu đã chọn
  handleOptionClick: PropTypes.func.isRequired, // Hàm để xử lý khi click vào màu
};

export default ProductColors;
