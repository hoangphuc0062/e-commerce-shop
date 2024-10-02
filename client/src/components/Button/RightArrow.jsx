import { IoIosArrowForward } from "react-icons/io";

const RightArrow = ({ handleOnClick, disabled }) => {
  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
    >
      <IoIosArrowForward />
    </button>
  );
};

export default RightArrow;
