// eslint-disable-next-line react/prop-types
const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="PlaceHolder"
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <button className="ml-4 p-2 bg-blue-500 text-white rounded-md">Tìm kiếm</button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
        <span className="material-icons text-2xl">💬</span>
        <span className="material-icons text-2xl">🔔</span>
          <img 
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" 
            src="https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-1/454935858_1025894225852691_7770544709709728940_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=mYuNCvwPK68Q7kNvgGMbmry&_nc_ht=scontent.fbmv1-1.fna&oh=00_AYCupQOGZ89Ki3HJe8qxhrNcGzxUeH2ST89hjVHK8R-5Ww&oe=66D613AE" alt="Bordered avatar"
          />

      </div>
    </div>
  );
}

export default Header;
