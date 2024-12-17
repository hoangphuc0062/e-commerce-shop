/* eslint-disable */
import { useState } from "react";
import { LabelItem } from "../../MenuTree/LabelItems"; // Assuming Labeltem is in the same folder
import "./MenuTree.css";
import { Link } from "react-router-dom";

const MenuTree = ({ dataCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setActiveCategory(categoryId);
  };
  return (
    <div className="flex bg-white" id="menu-tree__parent">
      <div className="label-menu-tree">
        {dataCategory.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(item.id)}
            className="menu-item"
          >
            <LabelItem icon={item.icon} links={item.links} />
          </div>
        ))}
      </div>

      {/* <div className="menu-tree-child-container bg-red-600">
        <div className="menu-tree-child-cols">
          <div className="grid">
            <div className="menu-tree-child-container">
              <div className="menu-tree-child-cols">
                <div className="grid gap-4">
                  {dataCategory?.map(
                    (item, index) =>
                      activeCategory === item.id && (
                        <div
                          key={index}
                          className="grid grid-cols-6 overflow-hidden"
                        >
                          {item?.children.map((child, childIndex) => (
                            <div
                              key={childIndex}
                              className="menu-tree-child-cols__item"
                            >
                              <div className="menu-tree-child-cols__item__title">
                                {child.title}
                              </div>
                              {child?.queries.map((query, queryIndex) => (
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
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MenuTree;
