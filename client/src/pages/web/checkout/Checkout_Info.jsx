import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const CheckoutInfo = () => {
  const [deliveryOption, setDeliveryOption] = useState("storePickup");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [searchTerm] = useState("");
  const [suggestions] = useState([]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-[#F4F6F8] mb-5">
      <div className="flex items-center justify-center mb-4">
        <a className="mr-4 ml-0 md:ml-0">
          <GoArrowLeft className="text-2xl" />
        </a>
        <h1 className="text-xl font-bold mb-0">Thông tin đơn hàng</h1>
      </div>
      <div className="flex center justify-center w-full py-5">
        <div className="text-main font-bold px-4 md:px-10">
          <button onClick={() => navigate("/checkout")}>1. THÔNG TIN</button>
        </div>
        <div className="text-red-600 font-bold px-4 md:px-10 cursor-pointer">
          <button
            className="text-gray-400 cursor-pointer"
            onClick={() => navigate("/payment")}
          >
            2. THANH TOÁN
          </button>
        </div>
      </div>

      <div className="cart-item flex items-center justify-between p-4 border-b mx-auto bg-white w-full max-w-[600px] rounded-[10px] mb-5">
        <div className="item-details flex-1 mx-4 text-left">
          <div className="item-info flex items-center py-5">
            <div className="flex items-center">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_7__2_103.png"
                alt="OPPO A3"
                className="w-24 h-24 mt-[-20px] ml-2"
              />
            </div>
            <div className="ml-4 flex flex-col justify-center ">
              <div className="flex items-center">
                <h2>OPPO A3 (6GB 128GB) - Tím</h2>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <p className="text-red-500 text-lg">
                    4.790.000đ <del className="text-black">4.990.000đ</del>
                  </p>
                </div>
                <p className="hidden md:block" style={{ marginLeft: "120px" }}>
                  Số lượng : 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-main font-semibold md:mr-80">THÔNG TIN KHÁCH HÀNG</p>
      <div className="customer-info w-full flex justify-center">
        <div className="w-full max-w-[600px] bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="text-lg">Nguyễn Sỹ</span>
              <span className="ml-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                S-NULL
              </span>
            </div>
            <span className="text-gray-600 text-sm">0344484162</span>
          </div>
          <div className="flex flex-col mt-3">
            <label className="text-gray-600 text-sm">EMAIL</label>
            <span className="text-gray-800">ntanh16122k3@gmail.com</span>
            <p className="text-xs text-gray-500 mt-1">
              (*) Hóa đơn VAT sẽ được gửi qua email này
            </p>
          </div>
          <div className="flex items-center mt-3">
            <input type="checkbox" id="newsletter" className="mr-2" />
            <label htmlFor="newsletter" className="text-sm text-gray-800">
              Nhận email thông báo và ưu đãi từ Voi Tây Nguyên
            </label>
          </div>
        </div>
      </div>

      <p className="text-main font-semibold md:mr-80 mt-8">
        THÔNG TIN NHẬN HÀNG
      </p>
      <div className="w-full flex justify-center mt-2">
        <div className="w-full max-w-[600px] bg-white p-6 rounded-lg shadow-md mb-5">
          <div className="flex items-center space-x-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="storePickup"
                checked={deliveryOption === "storePickup"}
                onChange={() => setDeliveryOption("storePickup")}
                className="mr-2"
              />
              Nhận tại cửa hàng
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="homeDelivery"
                checked={deliveryOption === "homeDelivery"}
                onChange={() => setDeliveryOption("homeDelivery")}
                className="mr-2"
              />
              Giao hàng tận nơi
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tỉnh / Thành phố
              </label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-1"
              >
                <option value="">Chọn Tỉnh/Thành Phố</option>
                <option value="DakLak">Đắk Lắk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn quận/huyện
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-1"
              >
                <option value="">Chọn Quận/Huyện</option>
              </select>
            </div>
          </div>

          {deliveryOption === "storePickup" && (
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Tìm kiếm địa chỉ cửa hàng
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ cửa hàng"
                value={searchTerm}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-1"
              />
              {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ghi chú khác (nếu có)
            </label>
            <input
              type="text"
              placeholder="Nhập ghi chú"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-1"
            />
          </div>
          <p className="text-sm text-gray-500">
            {" "}
            Mẹo: Bạn có thể cài đặt Số địa chỉ tại Smember để đặt hàng nhanh
            hơn.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-[600px] mx-auto sticky top-0">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold text-lg">
            Tổng tiền tạm tính:
          </span>
          <span className="text-red-600 text-xl font-bold">4.890.000đ</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          Chưa gồm chiết khấu SMember
        </p>
        <button
          className="w-full bg-main text-white py-3 rounded-md text-center text-lg font-semibold hover:bg-main transition duration-300 "
          onClick={() => (window.location.href = "/checkout")}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default CheckoutInfo;


