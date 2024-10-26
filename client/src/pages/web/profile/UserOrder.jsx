import OrderFilter from "../../../components/Profile/OrderFilter";
const UserOrder = () => {
  return (
    <div className="container mx-auto p-2 md:flex">
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4"></div>

        <div className="flex justify-center p-3 border border-gray-300 rounded-lg w-full">
          <div className="text-center mx-40">
            <p className="text-2xl font-bold">0</p>
            <p className="text-gray-500">đơn hàng</p>
          </div>
          <div className="text-center mx-40">
            <p className="text-2xl font-bold">0đ</p>
            <p className="text-gray-500">Tổng tiền tích lũy</p>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2"
            value="2020-12-01"
          />
          <span className="mx-2">-</span>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2"
            value="2024-10-03"
          />
        </div>

        {/* Order Filter */}
        <OrderFilter />

        {/* No Orders Image */}
        <div className="text-center mt-8">

          <div className="order-list">
            <div className="order-item border border-gray-300 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-500 font-bold">
                  99.9mhz Sale Khó Mua
                </span>
                <div className="flex items-center ml-auto px-2">
                  <Link to="/phone">
                    <button className="text-sm border border-gray-300 py-1 px-3 rounded-md">
                      Xem Shop
                    </button>
                  </Link>
                </div>
                <Link to="/profile/manage">
                  <button className="text-green-500">Hoàn Thành</button>
                </Link>
              </div>
              <div className="flex">
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_14t.png"
                  alt="Product"
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="text-left">
                  <p className="font-bold">Xiaomi 14T - series mới nhất</p>
                  <p className="text-gray-500">
                    Phân loại hàng: Xiaomi 14T, Đen - 256GB
                  </p>
                  <p className="text-gray-500">Số lượng: x1</p>
                  <p className="text-red-500 font-bold">
                    Thành tiền: 13.990.000 VNĐ
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/cart">
                  <button className="bg-main text-white py-1 px-3 rounded-md mr-2">
                    Mua Lại
                  </button>
                </Link>
                <button className="bg-gray-200 py-1 px-3 rounded-md">
                  Liên Hệ Người Bán
                </button>
              </div>
            </div>

            <div className="order-item border border-gray-300 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-500 font-bold">
                  Hoàng Lê-Biker Life
                </span>

                <div className="flex items-center ml-auto px-2">
                  <Link to="/phone">
                    <button className="text-sm border border-gray-300 py-1 px-3 rounded-md">
                      Xem Shop
                    </button>
                  </Link>
                </div>
                <Link to="/profile/manage">
                  <button className="text-green-500">Đã Hủy</button>
                </Link>
              </div>
              <div className="flex">
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:300:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-titan-sa-mac_3.png"
                  alt="Product"
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="text-left">
                  <p className="font-bold">
                    Iphone 16 Pro Max Series Chính Hãng VN/A
                  </p>
                  <p className="text-gray-500">
                    Phân loại hàng: 1TB, Titan Sa Mạc
                  </p>
                  <p className="text-gray-500">Số lượng: x1</p>
                  <p className="text-red-500 font-bold">
                    Thành tiền: 34.990.000 VNĐ
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/cart">
                  <button className="bg-main text-white py-1 px-3 rounded-md mr-2">
                    Mua Lại
                  </button>
                </Link>
                <button className="bg-gray-200 py-1 px-3 rounded-md">
                  Xem Chi Tiết Hủy Đơn
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
