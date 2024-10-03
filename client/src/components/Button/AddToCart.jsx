import icons from "../../ultils/icon";

const AddToCart = () => {
  const { FaCartPlus } = icons;
  return (
    <button className="flex flex-col items-center justify-center border border-main text-main rounded-lg p-2">
      <span className="mr-2">
        <FaCartPlus className="text-2xl" />
      </span>
      <span className="text-[10px]">Thêm vào giỏ</span>
    </button>
  );
};

export default AddToCart;
