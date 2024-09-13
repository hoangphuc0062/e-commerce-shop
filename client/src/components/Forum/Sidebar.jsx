import { Link } from "react-router-dom";
import CategoryPost from "../../data/Forum/CategoryPost";

const SideBar = () => {
  return (
    <>
      <div className="md:sticky md:overflow-y-auto md:pt-1 md:h-screen">
        <nav className="p-4">
          <ul className="space-y-2">
            {CategoryPost.map((category) => (
              <li key={category.id}>
                <Link
                  to={category.link}
                  className="flex text-lg items-center gap-2 p-[5px] text-gray-700 hover:bg-gray-100 rounded hover:text-red-500"
                >
                  {category.icon && <category.icon className="w-6 h-6" />}
                  {category.name}
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
