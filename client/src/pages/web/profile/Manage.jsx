import { useState } from "react";
import Sidebar from "../../../components/Profile/SidebarProfile";
import OrderFilter from "../../../components/Profile/OrderFilter";
import ProfileUser from "../../../components/Profile/ProfileUser";
import { FaRegEye } from "react-icons/fa";

const Manage = () => {
   // State để quản lý dialog và thông tin sản phẩm
   const [isOpen, setIsOpen] = useState(false);
   const [productDetails, setProductDetails] = useState(null);
 
   // Dữ liệu đơn hàng mẫu
   const orders = [
     {
       id: "S123456",
       image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s23-128gb_2_.png",
       name: "Iphone 15 pro max",
       category: "Điện thoại",
       color: "Trắng, 1TB",
       payment: "Thanh toán online",
       quantity: 1,
       total: "500.000.000Vnđ",
       status: "Chờ xác nhận",
     },
     {
       id: "Y789012",
       image: "https://down-vn.img.susercontent.com/file/sg-11134201-23020-menbgwxhzzmvf8.webp",
       name: "Samsung S22",
       category: "Điện thoại",
       color: "Hồng, 128GB",
       payment: "Thanh toán khi nhận hàng",
       quantity: 1,
       total: "750.000.000Vnđ",
       status: "Đã xác nhận",
     },
     {
      id: "Y789012",
      image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_3__3.png",
      name: "MacBook Air M3 15 inch 2024 8GB - 256GB",
      category: "Laptop",
      color: "Hồng, 128GB",
      payment: "Thanh toán khi nhận hàng",
      quantity: 1,
      total: "900.000.000Vnđ",
      status: "Đang vận chuyển",
    },
    {
      id: "Y789012",
      image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_3__3.png",
      name: "MacBook Air M3 15 inch 2024 8GB - 256GB",
      category: "Laptop",
      color: "Hồng, 128GB",
      payment: "Thanh toán khi nhận hàng",
      quantity: 10,
      total: "900.000.000Vnđ",
      status: "Giao hàng thành công",
    },
   ];
 
   // Hàm mở dialog
   const handleOpenDialog = (product) => {
     setProductDetails(product);
     setIsOpen(true);
   };
 
   // Hàm đóng dialog
   const handleCloseDialog = () => {
     setIsOpen(false);
     setProductDetails(null);
   };
 
  return (
    <div className="container mx-auto p-2 md:flex">
        {/* Sidebar */}
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/6 mb-4 md:mb-0">
            <Sidebar />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
          <ProfileUser />
        </div>
            {/* Ngày bắt đầu và ngày kết thúc */}
          <div className="mb-4 mt-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-auto">
              <input
                type="date"
                className="w-full md:w-auto border border-gray-300 rounded-full px-5 py-3 pl-10 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-lg hover:bg-gray-50 hover:scale-105 transform"
                value="2020-12-01"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3M16 7V3M4 11H20M5 19H19C20.1046 19 21 18.1046 21 17V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V17C3 18.1046 3.89543 19 5 19Z"
                  ></path>
                </svg>
              </span>
            </div>

            <span className="text-gray-500">-</span>

            <div className="relative w-full md:w-auto">
              <input
                type="date"
                className="w-full md:w-auto border border-gray-300 rounded-full px-5 py-3 pl-10 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm hover:shadow-lg hover:bg-gray-50 hover:scale-105 transform"
                value="2024-10-03"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3M16 7V3M4 11H20M5 19H19C20.1046 19 21 18.1046 21 17V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V17C3 18.1046 3.89543 19 5 19Z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>

          {/* Order Filter */}
          <OrderFilter />

        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b whitespace-nowrap">Mã đơn hàng</th>
                <th className="py-2 px-4 border-b "></th>
                <th className="py-2 px-4 border-b">Tên sản phẩm</th>
                <th className="py-2 px-4 border-b">Thanh toán</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Số lượng</th>
                <th className="py-2 px-4 border-b">Tổng tiền</th>
                <th className="py-2 px-4 border-b">Trạng thái</th>
                <th className="py-2 px-4 border-b whitespace-nowrap">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b"><img src={order.image} alt={order.name} className="w-15 h-15" /></td>
                  <td className="py-2 px-4 border-b">{order.name}</td>
                  <td className="py-2 px-4 border-b">{order.payment}</td>
                  <td className="py-2 px-4 border-b">{order.quantity}</td>
                  <td className="py-2 px-4 border-b">{order.total}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap">
                    <button className={`w-25 h-8 rounded-full text-white px-1 ${order.status === "Chờ xác nhận" ? "bg-yellow-500" : order.status === "Đã xác nhận" ? "bg-blue-500" : "bg-green-500"}`}>
                      {order.status}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleOpenDialog(order)}>
                      <FaRegEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dialog chi tiết sản phẩm */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-auto transform transition-transform duration-300 ease-in-out scale-105">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Chi tiết đơn hàng
              </h3>
              {productDetails && (
                <div className="flex items-center space-x-6">
                  <img
                    src={productDetails.image}
                    alt={productDetails.name}
                    className="w-40 h-40 object-cover rounded-lg shadow-lg"
                  />
                  <div className="text-gray-700 space-y-3">
                    <p>
                      <strong>Mã đơn hàng:</strong> {productDetails.id}
                    </p>
                    <p>
                      <strong>Tên sản phẩm:</strong> {productDetails.name}
                    </p>
                    <p>
                      <strong>Phân loại:</strong> {productDetails.color}
                    </p>
                    <p>
                      <strong>Thanh toán:</strong> {productDetails.payment}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {productDetails.quantity}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong> {productDetails.total}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong> {productDetails.status}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="py-2 px-6 rounded-md bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 focus:outline-none transition-colors duration-300"
                  onClick={handleCloseDialog}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
        </div>
    </div>
  )
}

export default Manage