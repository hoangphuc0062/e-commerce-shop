import EmptyCart from "../../../../components/EmptyCart";
import Discount from "../discount";
import CartItem from "./CartItem";
import { Icon } from "@iconify/react";

export default function CartReview({
  products,
  setProducts,
  selectedProducts,
  setSelectedProducts,
  handleNextStep,
  handleQuantityChange,
  handleRemoveProduct,
  handleSelectAll,
  selectAll,
  handleUpdateSelected,
  handleRemoveSelected,
  handleCheck,
  toggleDropdown,
  isDropdownOpen,
  discountCode,
  setDiscountCode,
  handleApplyCode,
  discountOptions,
  subTotal,
  emptyCartImage,
}) {
  return (
    <>
      {products.length > 0 ? (
        <>
          <div>
            <div className="flex items-center mb-4 justify-between">
              <div>
                {" "}
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                <span className=" cursor-pointer" onClick={handleSelectAll}>
                  Chọn tất cả
                </span>
              </div>
              {selectedProducts.length > 0 && (
                <>
                  <div>
                    <button
                      className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded"
                      onClick={handleUpdateSelected}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                      onClick={handleRemoveSelected}
                    >
                      Xóa tất cả
                    </button>
                  </div>
                </>
              )}
            </div>
            {products.map((product, index) => (
              <CartItem
                key={index}
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveProduct}
                isChecked={selectedProducts.includes(product.id)}
                onCheck={handleCheck}
                setProducts={setProducts}
              />
            ))}

            <div className=" p-4 ">
              {/* Discount Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2  text-blue-600  hover:bg-indigo-100 rounded-md"
              >
                <Icon
                  icon="mdi:tag-outline"
                  className="text-blue-600 mr-2"
                  width={20}
                />
                Sử dụng mã giảm giá
                <Icon
                  icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-blue-600 ml-2"
                  width={20}
                />
              </button>

              {/* Dropdown content */}
              {isDropdownOpen && (
                <div className="mt-4 border rounded-md p-4 bg-indigo-50">
                  {/* Discount Code Input */}
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá/Phiếu mua hàng"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleApplyCode}
                      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {/* Discount Options */}
                  <Discount
                    discountOptions={discountOptions}
                    setDiscountCode={setDiscountCode}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <p>Tổng tiền:</p>
              <p className="text-indigo-600">
                {subTotal.toLocaleString("vi-VN")} VND
              </p>
            </div>
            <button
              onClick={handleNextStep}
              disabled={selectedProducts.length === 0}
              className={`w-full py-3 font-semibold rounded text-center ${
                selectedProducts.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white"
              }`}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <EmptyCart
            emptyCartImage={emptyCartImage}
            to="/"
            classNameString="w-1/2 mb-5"
            title="Giỏ hàng của bạn trống"
            content="Hãy chắc chắn rằng bạn đã thêm sản phẩm vào giỏ hàng"
            button="Tiếp tục mua sắm"
          />
        </div>
      )}
    </>
  );
}
