import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

export const MenuTreeChildren = ({ children }) => {
  return (
    <div className="menu-tree-child-cols__item grid grid-cols-6 gap-4">
      {children &&
        children.map((child, index) => (
          <div key={index}>
            <div className="menu-tree-child-cols__item__title">
              {child.title}
            </div>
            {child.queries.map((query, queryIndex) => (
              <Link
                to={query.url}
                key={queryIndex}
                className="menu-tree-child-cols__item__link"
              >
                {query.name}
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

MenuTreeChildren.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      queries: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
};
