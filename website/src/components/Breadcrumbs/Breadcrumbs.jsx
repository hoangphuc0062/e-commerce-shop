import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routeTranslations } from "./routeTranslationsConfig";
import { Icon } from "@iconify/react/dist/iconify.js";
// import HomeIcon from "@mui/icons-material/Home";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const translatePath = (pathSegment) =>
  routeTranslations[pathSegment] || capitalizeFirstLetter(pathSegment);

const BreadcrumbsCustom = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Ẩn Breadcrumbs nếu đang ở trang "/"
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center space-x-4 font-bold breadcrumb">
        {/* Trang chủ */}

        <Link to="/" className=" dark:hover:text-gray-200">
          <div className="flex items-center justify-center">
            <Icon icon="bitcoin-icons:home-outline" width="24" height="24" />
            Trang chủ
          </div>
        </Link>

        {/* Các mục đường dẫn */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <li className="text-gray-500 dark:text-gray-400 text-lg">/</li>
              <li>
                <Link
                  className={
                    isLast
                      ? "text-[#333] dark:text-white text-base cursor-pointer"
                      : "text-gray-500 dark:text-gray-400 text-base cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                  }
                  to={to}
                >
                  {translatePath(value)}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadcrumbsCustom;
