/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function CartButton({ data = [] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantities, setQuantities] = useState(data.map(() => 1));
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(1, value);
    setQuantities(newQuantities);
  };

  const incrementQuantity = (index) => {
    handleQuantityChange(index, quantities[index] + 1);
  };

  const decrementQuantity = (index) => {
    handleQuantityChange(index, quantities[index] - 1);
  };

  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const deleteSelectedItems = () => {
    const filteredQuantities = quantities.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setSelectedItems([]);
    setQuantities(filteredQuantities);
  };

  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedItems(data.map((_, index) => index)); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex items-center justify-center text-[12px] w-[80px] hover:bg-hv p-2 rounded-lg"
        onClick={toggleDropdown}
      >
        <div className="flex items-center justify-center relative">
          <Icon icon="carbon:shopping-bag" width="2rem" height="2rem" />
          <span className="absolute top-0 right-0 bg-white text-black rounded-full px-1 text-[10px]">
            {data.length || 0}
          </span>
        </div>
        <p className="line-clamp-2">Giỏ hàng</p>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-10 ">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Giỏ hàng</h2>

            {/* Select All Checkbox */}
            {data.length > 0 && (
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-gray-600"
                />
                <span className="ml-2 text-gray-700">Chọn tất cả</span>
              </div>
            )}

            <ul className="space-y-4">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-4 w-4 text-gray-600"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-sm text-gray-900">{item.name}</h3>
                      <dl className="mt-0.5 text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Size:</dt>
                          <dd className="inline">{item.size}</dd>
                        </div>
                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">{item.color}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className="h-8 w-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-600"
                      >
                        <Icon
                          icon="carbon:subtract"
                          width="1rem"
                          height="1rem"
                        />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[index]}
                        onChange={(event) =>
                          handleQuantityChange(
                            index,
                            Number(event.target.value)
                          )
                        }
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 text-center text-xs text-gray-600 no-spinner focus:outline-none"
                      />
                      <button
                        onClick={() => incrementQuantity(index)}
                        className="h-8 w-8 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-600"
                      >
                        <Icon icon="carbon:add" width="1rem" height="1rem" />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  Giỏ hàng của bạn đang trống
                </p>
              )}
            </ul>

            {/* Delete Selected Button */}
            {selectedItems.length > 0 && (
              <button
                onClick={deleteSelectedItems}
                className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
              >
                Xóa mục đã chọn ({selectedItems.length})
              </button>
            )}

            {/* Cart Actions */}
            <div className="mt-4 space-y-4 text-center">
              <Link
                to={"/cart"}
                className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 hover:ring-1 hover:ring-indigo-400 transition"
              >
                Xem giỏ hàng ({data.length || 0})
              </Link>
              <Link
                to={"/checkout"}
                className="block rounded bg-indigo-600 px-5 py-3 text-sm text-white hover:bg-indigo-500 transition"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartButton;
