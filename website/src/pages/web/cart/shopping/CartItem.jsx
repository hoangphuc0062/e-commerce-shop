/* eslint-disable react/prop-types */

const CartItem = ({ product, onQuantityChange, isChecked, onCheck }) => {
  const handleDecreaseQuantity = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    onQuantityChange(product.id, product.quantity + 1);
  };

  const handleCheckboxChange = () => {
    onCheck(product.id);
  };

  return (
    <div className="flex items-center justify-between border-b pb-4 mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-4"
        />
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-20 h-20 object-cover rounded mr-4"
        />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-indigo-600 font-semibold">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
          <p className="text-gray-500 line-through">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border px-2 py-1 rounded-md mr-4">
          <button className="px-2" onClick={handleDecreaseQuantity}>
            -
          </button>
          <input
            type="text"
            value={product.quantity}
            className="w-8 text-center"
            min={1}
            readOnly
          />
          <button className="px-2" onClick={handleIncreaseQuantity}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
