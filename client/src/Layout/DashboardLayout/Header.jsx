/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ toggleDarkMode, darkMode, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="w-full bg-white dark:bg-gray-900 p-4 flex justify-between items-center border-b-2">
      <div></div>
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* Icons */}
        <span className="material-icons text-2xl cursor-pointer">💬</span>
        <span className="material-icons text-2xl cursor-pointer">🔔</span>

        {/* User Avatar */}
        <div className="relative">
          <img
            onClick={toggleDropdown}
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            id="avatarButton"
            src="https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-1/454935858_1025894225852691_7770544709709728940_n.jpg"
            alt="Bordered avatar"
          />

          {/* Dropdown Menu */}
          <div
            className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2 ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            {/* User Info */}
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user ? user.name : "admin"}</div>
              <div className="font-medium truncate">
                {user ? user.email : "admin@gmail.com"}
              </div>
            </div>
            {/* Sign Out */}
            <div className="py-1">
              <Link
                to="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
