const OrderFilter = () => {
    return (
      <div className="flex flex-wrap space-x-2 mb-4">
        <button className="bg-main text-white py-2 px-4 rounded-md mb-2 md:mb-0">Tất cả</button>
        <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Chờ xác nhận</button>
        <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã xác nhận</button>
        <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đang vận chuyển</button>
        <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã giao hàng</button>
        <button className="bg-gray-200 py-2 px-4 rounded-md mb-2 md:mb-0">Đã huỷ</button>
      </div>
    );
  };
  
  export default OrderFilter;
  