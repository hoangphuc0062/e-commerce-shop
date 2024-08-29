import { useState } from "react";

function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`sidebar ${expanded ? 'w-64' : 'w-20'} bg-gray-800 dark:bg-gray-900 text-white flex flex-col p-4 transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <img 
          className={`text-lg font-bold w-16 ${expanded ? 'block' : 'hidden'}`} 
          src="https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-1/454935858_1025894225852691_7770544709709728940_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=mYuNCvwPK68Q7kNvgGMbmry&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCupQOGZ89Ki3HJe8qxhrNcGzxUeH2ST89hjVHK8R-5Ww&oe=66D613AE" 
          alt="Logo"/>
        
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
