import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routeTranslations } from "./routeTranslationsConfig";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const translatePath = (pathSegment) => {
  return routeTranslations[pathSegment]
    ? routeTranslations[pathSegment]
    : capitalizeFirstLetter(pathSegment);
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center space-x-4 font-sans">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={to}>
              {index > 0 && (
                <li className="text-gray-500 dark:text-gray-400 text-lg">/</li>
              )}{" "}
              {/* Only show '/' after the first item */}
              <li>
                <Link
                  className={
                    index === pathnames.length - 1
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

export default Breadcrumbs;
