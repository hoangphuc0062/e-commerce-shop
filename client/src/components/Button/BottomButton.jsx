import React from "react";
import { Link } from "react-router-dom";

export const BottomButton = ({ icon: IconComponent, name = "", to = "/" }) => {
  return (
    <Link
      to={to}
      type="button"
      className="inline-flex flex-col items-center justify-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <span className="text-lg text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        {IconComponent && <IconComponent />}
      </span>
      <span className="text-sm text-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        {name}
      </span>
    </Link>
  );
};
