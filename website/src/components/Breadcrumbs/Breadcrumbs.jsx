import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routeTranslations } from "./routeTranslationsConfig";
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
      <ul className="flex items-center space-x-4 font-sans breadcrumb">
        {/* Trang chủ */}
        <li>
          <Link
            to="/"
            className="flex items-center text-gray-500 dark:text-gray-400 text-base cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
              ></path>
            </svg>
            {/* <HomeIcon fontSize="small" className="mr-1" /> */}
            Trang chủ
          </Link>
        </li>

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
                      ? "text-[#333] dark:text-white text-base font-bold cursor-pointer"
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
