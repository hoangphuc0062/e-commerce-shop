/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const ButtonContact = ({ iconName, title, content, link }) => {
  return (
    <Link
      to={link ? link : ""}
      className="flex items-center max-w-1/5  hover:bg-hv p-2 rounded-lg"
    >
      <div className="mr-1">
        <Icon icon={iconName} width="1.5rem" height="1.5rem" />
      </div>
      <div className="text-left max-w-[60px] text-[12px]">
        <p className="line-clamp-2">{title}</p>
        <strong>{content}</strong>
      </div>
    </Link>
  );
};
