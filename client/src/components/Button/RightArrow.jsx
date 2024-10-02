import { IoIosArrowForward } from "react-icons/io";

const RightArrow = ({ handleOnClick, disabled }) => {
  return (
    <button
      onClick={handleOnClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-s-full p-4"
      disabled={disabled}
    >
      <IoIosArrowForward />
    </button>
  );
};

export default RightArrow;
