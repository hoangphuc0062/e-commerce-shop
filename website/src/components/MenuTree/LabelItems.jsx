import { Icon } from "@iconify-icon/react/dist/iconify.js";

import { Link } from "react-router-dom";

import "./MenuTree.css";
import propTypes from "prop-types";

export const Labeltem = ({ icon, links }) => {
  return (
    <div className="label-item">
      <div className="right-content">
        <div className="icon-left">
          <Icon icon={icon} className="label__ico mr-2" />
          {links &&
            links.map((link, index) => (
              <Link key={index} to={link.url} className="label--item__link">
                {link.name}
              </Link>
            ))}
        </div>
      </div>
      <div className="icon-right">
        <Icon icon="akar-icons:chevron-right" />
      </div>
    </div>
  );
};

Labeltem.propTypes = {
  icon: propTypes.string.isRequired,
  links: propTypes.array.isRequired,
};
