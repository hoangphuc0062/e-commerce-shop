import { Link } from "react-router-dom";
import CategoryPost from "../../../data/Forum/CategoryPost";
import "./Sidebar.css";

const SideBar = () => {
  return (
    <>
      {/* Sidebar cho màn hình lớn */}
      <div className="hidden md:block md:sticky md:overflow-y-auto md:pt-1 md:h-screen fixed top-0 left-0">
        <nav className="p-4">
          <ul className="space-y-2">
            {CategoryPost?.map((category) => (
              <li key={category.id}>
                <Link
                  to={category.link}
                  className="flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-gray-100 rounded hover:text-main"
                >
                  {category.icon && <category.icon className="w-6 h-6" />}
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar cho màn hình nhỏ */}
      <div className="md:hidden bg-white p-4 z-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav>
          <ul className="flex space-x-4">
            {CategoryPost?.map((category) => (
              <li key={category.id} className="inline-block shrink-0">
                <Link
                  to={category.link}
                  className="flex flex-col items-center gap-2 p-[5px] text-gray-700 hover:bg-gray-100 rounded hover:text-main"
                >
                  {category.icon && <category.icon className="w-6 h-6" />}
                  <span className="text-xs">{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
