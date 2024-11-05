import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";
export const LabelItem = ({ icon, links }) => {
  return (
    <div className="flex justify-between items-center p-2 cursor-pointer transition-colors duration-300 text-lg font-medium hover:bg-gray-100 w-full">
      <div className="flex items-center">
        <Icon
          icon={icon}
          className="pr-1 hover:text-main"
          width={"2rem"}
          height={"2rem"}
        />
        <span className="text-sm">
          {links.map((link, index) => (
            <Link key={index} to={link.url} className="hover:text-main">
              {link.name}
            </Link>
          ))}
        </span>
      </div>
      <div>
        <Icon icon="akar-icons:chevron-right" className="text-xs" />
      </div>
    </div>
  );
};

LabelItem.propTypes = {
  icon: propTypes.string,
  links: propTypes.array,
};
