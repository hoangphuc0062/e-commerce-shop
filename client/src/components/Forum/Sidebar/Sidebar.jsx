import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategory } from "../../../redux/slices/category";

import Iconify from "./Iconify";

const SideBar = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.category.status);
  const categoryData = useSelector((state) => state.category.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(categoryData)) {
      setData(
        categoryData.map((item) => ({
          status: item.status,
          id: item._id,
          name: item?.name,
          icon: item?.icon,
          slug: item?.slug,
          type: item?.type,
        }))
      );
    }
  }, [status, categoryData]);

  const categoryPostData = categoryData.filter((item) => item.type === "post");

  return (
    <>
      {/* Sidebar cho màn hình lớn */}
      <div className="lg:block fixed">
        <nav className="p-4">
          <ul className="space-y-2">
            {data &&
              categoryPostData?.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/forum/category/${category.slug}`}
                    className="flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-hv rounded hover:text-main"
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
      <div className="md:hidden bg-white p-4 z-50 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav>
          <ul className="flex space-x-4">
            {data &&
              categoryPostData?.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`forum/category/${category.slug}`}
                    className="flex text-sm items-center gap-2 p-2 text-gray-700 hover:bg-hv rounded hover:text-main"
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

export default SideBar;
