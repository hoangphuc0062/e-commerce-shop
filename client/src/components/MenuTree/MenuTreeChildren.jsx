import { Link } from "react-router-dom";
import "./style.css";

export const MenuTreeChildren = ({ children }) => {
  return (
    <div>
      {children.map((child, index) => (
        <div key={index} className="menu-tree-child-cols__item">
          <div className="menu-tree-child-cols__item__title">{child.title}</div>
          {child.queries.map((query, queryIndex) => (
            <div key={queryIndex} className="menu-tree-child-cols__item__link">
              <Link to={query.url}>{query.name}</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
