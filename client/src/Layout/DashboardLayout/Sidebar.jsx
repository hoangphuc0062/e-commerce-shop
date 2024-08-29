import { useState } from "react";

function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`sidebar ${expanded ? 'w-64' : 'w-20'} bg-gray-800 dark:bg-gray-900 text-white flex flex-col p-4 transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <img className={`text-lg font-bold ${expanded ? 'block' : 'hidden'}`} src="" alt="Logo"/>
        
        <button
          onClick={toggleSidebar}
          className="p-2  rounded-md text-center"
          aria-label={expanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {expanded ? '<<' : '>>'}
        </button>
      </div>

      <ul className="flex flex-col space-y-4">
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">🏠</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Bảng Điều Khiển</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">📁</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Danh Mục</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">📦</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Sản Phẩm</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">🔄</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Biến thể</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">👤</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Người Dùng</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">🛒</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Đơn Hàng</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">🎫</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Coupon</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">📝</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Bài Đăng</span>
        </li>
        <li className="hover:bg-gray-700 dark:hover:bg-gray-800 p-2 rounded-md flex items-center">
          <span className="text-2xl">🌐</span>
          <span className={`ml-2 ${expanded ? 'inline' : 'hidden'}`}>Tài Nguyên Web</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
