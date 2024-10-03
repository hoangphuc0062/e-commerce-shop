
import { IoIosArrowBack } from "react-icons/io";

const LeftArrow = ({ handleOnClick, disabled }) => {
  return (
    <button
      onClick={handleOnClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-e-full p-4"
      disabled={disabled}
    >
      <IoIosArrowBack />
    </button>
  );
};

export default LeftArrow;
