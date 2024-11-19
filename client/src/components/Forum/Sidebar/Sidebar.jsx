import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getCategory } from "../../../redux/slices/category";
import Iconify from "./Iconify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const status = useSelector((state) => state.category.status);
  const categoryData = useSelector((state) => state.category.data.categories);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(categoryData)) {
      setData(
        categoryData
          .filter((item) => item.type === "post")
          .map((item) => ({
            id: item._id,
            name: item.name,
            icon: item.icon,
            slug: item.slug,
          }))
      );
    }
  }, [status, categoryData]);

  return (
    <>
      {/* Sidebar cho màn hình lớn */}
      <div className="hidden md:block md:sticky md:overflow-y-auto md:pt-1 md:h-screen fixed top-16 left-0 ">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex text-sm items-center gap-2 p-2 rounded-lg hover:text-main capitalize ${
                  location.pathname === "/"
                    ? "bg-gray-100 text-main"
                    : "text-gray-700"
                }`}
              >
                <Iconify icon="mdi:home" />
                Trang chủ
              </Link>
            </li>
            {data.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                    location.pathname === `/category/${category.slug}`
                      ? "bg-gray-100 text-main"
                      : "text-gray-700"
                  }`}
                >
                  <Iconify icon={category.icon} />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar cho màn hình nhỏ */}
      <div className="md:hidden bg-white p-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                  location.pathname === "/"
                    ? "bg-gray-100 text-main"
                    : "text-gray-700"
                }`}
              >
                <Iconify icon="mdi:home" />
                Trang chủ
              </Link>
            </li>
            {data.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.slug}`}
                  className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                    location.pathname === `/category/${category.slug}`
                      ? "bg-gray-100 text-main"
                      : "text-gray-700"
                  }`}
                >
                  <Iconify icon={category.icon} />
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

export default Sidebar;
