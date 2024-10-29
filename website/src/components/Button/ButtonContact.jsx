/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";

export const ButtonContact = ({ iconName, title, content }) => {
  return (
    <button className="flex items-center max-w-[103px]  hover:bg-hv p-2 rounded-lg">
      <div className="mr-1">
        <Icon icon={iconName} width="1.5rem" height="1.5rem" />
      </div>
      <div className="text-left text-[12px]">
        <p className="line-clamp-2">{title}</p>
        <strong>{content}</strong>
      </div>
    </button>
  );
};
