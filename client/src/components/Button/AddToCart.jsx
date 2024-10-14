import icons from "../../ultils/icon";

const AddToCart = () => {
  const { FaCartPlus } = icons;

  const handleAddToCart = () => {
    console.log("Item added to cart");
  };

  return (
    <button 
      className="flex flex-col items-center justify-center border border-main text-main rounded-lg p-2 hover:bg-main hover:text-white"
      onClick={handleAddToCart}
    >
      <span className="mr-2">
        <FaCartPlus className="text-2xl" />
      </span>
      <span className="text-[10px]">Thêm vào giỏ</span>
    </button>
  );
};

export default AddToCart;
