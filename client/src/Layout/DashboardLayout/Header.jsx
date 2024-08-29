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
          {darkMode ? '☀️' : '🌙'}
        </button>
        <span className="material-icons">notifications</span>
        <span className="material-icons">account_circle</span>
      </div>
    </div>
  );
}

export default Header;
