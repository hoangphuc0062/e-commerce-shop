import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategory } from "../../../redux/slices/category";
import Iconify from "./Iconify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleCategoryClick = (slug) => {
    navigate(`/forum/category/${slug}`);
  };
  return (
    <>
      {/* Sidebar cho màn hình lớn */}
      <div className="hidden md:block md:sticky md:overflow-y-auto md:pt-1 md:h-screen fixed top-16 left-0 ">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/forum")}
                className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                  location.pathname === "/forum"
                    ? "bg-hv text-main"
                    : "text-gray-700"
                }`}
              >
                <Iconify icon="mdi:home" />
                Trang chủ
              </button>
            </li>
            {data.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                    location.pathname === `/forum/category/${category.slug}`
                      ? "bg-hv text-main"
                      : "text-gray-700"
                  }`}
                >
                  <Iconify icon={category.icon} />
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar cho màn hình nhỏ */}
      <div className="md:hidden bg-white p-4 z-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => navigate("/forum")}
                className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                  location.pathname === "/forum"
                    ? "bg-hv text-main"
                    : "text-gray-700"
                }`}
              >
                <Iconify icon="mdi:home" />
                Trang chủ
              </button>
            </li>
            {data.length > 0 ? (
              data.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`flex text-sm items-center gap-2 p-2 rounded hover:text-main capitalize ${
                      location.pathname === `/forum/category/${category.slug}`
                        ? "bg-hv text-main"
                        : "text-gray-700"
                    }`}
                  >
                    <Iconify icon={category.icon} />
                    {category.name}
                  </button>
                </li>
              ))
            ) : (
              <p>Đang tải danh mục...</p>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
