import Sidebar from "../../../components/Profile/SidebarProfile";
const UserOrder = () => {
  return (
    <div className="container mx-auto p-2 md:flex">
        {/* Sidebar */}
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/6 mb-4 md:mb-0">
            <Sidebar />
        </div>
        {/* Main Content */}
      <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-4">
        <div className="flex items-center space-x-4 mb-4">
            <img
              src="https://cdn2.cellphones.com.vn/50x50,webp,q100/media/wysiwyg/Shipper_CPS3_1.png"
              alt="Avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-bold">NGUYỄN SỸ</h2>
              <p className="text-gray-500">0344484162</p>
              <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                SNULL
              </span>
            </div>
        </div>

        <div className="flex justify-center p-3 border border-gray-300 rounded-lg mx-auto" style={{ maxWidth: '650px' }}>
            <div className="text-center mx-20">
              <p className="text-2xl font-bold">0</p>
              <p className="text-gray-500">đơn hàng</p>
            </div>
            <div className="text-center mx-20">
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
        <div className="flex flex-wrap space-x-2 mb-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md mb-2 md:mb-0">Tất cả</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Chờ xác nhận</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã xác nhận</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đang vận chuyển</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã giao hàng</button>
          <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã huỷ</button>
        </div>

        {/* No Orders Image */}
        <div className="text-center mt-8">
          <img
            src="https://cellphones.com.vn/smember/_nuxt/img/empty.db6deab.svg"
            alt="No Orders"
            className="mx-auto w-1/5"
          />
          <p className="mt-4 text-gray-500">Không có đơn hàng nào thoả mãn!</p>
        </div>
      </div>
    </div>
  )
}

export default UserOrder