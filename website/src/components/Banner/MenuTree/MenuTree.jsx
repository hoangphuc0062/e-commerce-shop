// MenuTree.js
import { useState } from "react";
import { LabelItem } from "../../MenuTree/LabelItems"; // Assuming Labeltem is in the same folder
import "./MenuTree.css";
import { Link } from "react-router-dom";

const data = [
  {
    id: "phone-tablet",
    icon: "quill:phone",
    links: [
      { url: "/phone", name: "Điện thoại," },
      { url: "/tablet", name: "Tablet" },
    ],
    children: [
      {
        title: "Điện thoại",
        queries: [
          { url: "/phone/samsung", name: "Samsung" },
          { url: "/phone/iphone", name: "Iphone" },
          { url: "/phone/oppo", name: "Oppo" },
          { url: "/phone/xiaomi", name: "Xiaomi" },
        ],
      },
      {
        title: "Tablet",
        queries: [
          { url: "/tablet/samsung", name: "Samsung" },
          { url: "/tablet/ipad", name: "iPad" },
          { url: "/tablet/lenovo", name: "Lenovo" },
          { url: "/tablet/huawei", name: "Huawei" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/phone/price/2m", name: "Trên 2 triệu" },
          { url: "/phone/price/5m", name: "Trên 5 triệu" },
          { url: "/phone/price/7m", name: "Trên 7 triệu" },
        ],
      },
    ],
  },
  {
    id: "laptop",
    icon: "bi:laptop",
    links: [{ url: "/laptop", name: "Laptop" }],
    children: [
      {
        title: "Laptop",
        queries: [
          { url: "/laptop/asus", name: "Asus" },
          { url: "/laptop/dell", name: "Dell" },
          { url: "/laptop/hp", name: "HP" },
          { url: "/laptop/lenovo", name: "Lenovo" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/laptop/price/10m", name: "Trên 10 triệu" },
          { url: "/laptop/price/15m", name: "Trên 15 triệu" },
          { url: "/laptop/price/20m", name: "Trên 20 triệu" },
        ],
      },
    ],
  },
  {
    id: "smartwatch",
    icon: "bi:smartwatch",
    links: [{ url: "/smartwatch", name: "Đồng hồ" }],
    children: [
      {
        title: "Đồng hồ",
        queries: [
          { url: "/smartwatch/apple", name: "Apple" },
          { url: "/smartwatch/samsung", name: "Samsung" },
          { url: "/smartwatch/xiaomi", name: "Xiaomi" },
          { url: "/smartwatch/huawei", name: "Huawei" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/smartwatch/price/5m", name: "Trên 5 triệu" },
          { url: "/smartwatch/price/10m", name: "Trên 10 triệu" },
          { url: "/smartwatch/price/15m", name: "Trên 15 triệu" },
        ],
      },
    ],
  },
  {
    id: "camera",
    icon: "bi:camera",
    links: [{ url: "/camera", name: "Máy ảnh" }],
    children: [
      {
        title: "Máy ảnh",
        queries: [
          { url: "/camera/canon", name: "Canon" },
          { url: "/camera/nikon", name: "Nikon" },
          { url: "/camera/sony", name: "Sony" },
          { url: "/camera/fujifilm", name: "Fujifilm" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/camera/price/10m", name: "Trên 10 triệu" },
          { url: "/camera/price/20m", name: "Trên 20 triệu" },
          { url: "/camera/price/30m", name: "Trên 30 triệu" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/camera/price/10m", name: "Trên 10 triệu" },
          { url: "/camera/price/20m", name: "Trên 20 triệu" },
          { url: "/camera/price/30m", name: "Trên 30 triệu" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/camera/price/10m", name: "Trên 10 triệu" },
          { url: "/camera/price/20m", name: "Trên 20 triệu" },
          { url: "/camera/price/30m", name: "Trên 30 triệu" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/camera/price/10m", name: "Trên 10 triệu" },
          { url: "/camera/price/20m", name: "Trên 20 triệu" },
          { url: "/camera/price/30m", name: "Trên 30 triệu" },
        ],
      },
    ],
  },
  {
    id: "headphones",
    icon: "bi:headphones",
    links: [{ url: "/headphones", name: "Tai nghe" }],
    children: [
      {
        title: "Tai nghe",
        queries: [
          { url: "/headphones/sony", name: "Sony" },
          { url: "/headphones/bose", name: "Bose" },
          { url: "/headphones/jbl", name: "JBL" },
          { url: "/headphones/apple", name: "Apple" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/headphones/price/1m", name: "Trên 1 triệu" },
          { url: "/headphones/price/2m", name: "Trên 2 triệu" },
          { url: "/headphones/price/3m", name: "Trên 3 triệu" },
        ],
      },
    ],
  },
  {
    id: "television",
    icon: "bi:tv",
    links: [{ url: "/television", name: "TV" }],
    children: [
      {
        title: "TV",
        queries: [
          { url: "/television/samsung", name: "Samsung" },
          { url: "/television/lg", name: "LG" },
          { url: "/television/sony", name: "Sony" },
          { url: "/television/panasonic", name: "Panasonic" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/television/price/10m", name: "Trên 10 triệu" },
          { url: "/television/price/20m", name: "Trên 20 triệu" },
          { url: "/television/price/30m", name: "Trên 30 triệu" },
        ],
      },
    ],
  },
  {
    id: "gaming-console",
    icon: "bi:controller",
    links: [{ url: "/gaming-console", name: "Máy chơi game" }],
    children: [
      {
        title: "Máy chơi game",
        queries: [
          { url: "/gaming-console/ps5", name: "PS5" },
          { url: "/gaming-console/xbox", name: "Xbox" },
          { url: "/gaming-console/nintendo", name: "Nintendo" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/gaming-console/price/10m", name: "Trên 10 triệu" },
          { url: "/gaming-console/price/15m", name: "Trên 15 triệu" },
          { url: "/gaming-console/price/20m", name: "Trên 20 triệu" },
        ],
      },
    ],
  },
  {
    id: "printer",
    icon: "bi:printer",
    links: [{ url: "/printer", name: "Máy in" }],
    children: [
      {
        title: "Máy in",
        queries: [
          { url: "/printer/hp", name: "HP" },
          { url: "/printer/canon", name: "Canon" },
          { url: "/printer/epson", name: "Epson" },
          { url: "/printer/brother", name: "Brother" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/printer/price/2m", name: "Trên 2 triệu" },
          { url: "/printer/price/5m", name: "Trên 5 triệu" },
          { url: "/printer/price/7m", name: "Trên 7 triệu" },
        ],
      },
    ],
  },
  {
    id: "scanner",
    icon: "material-symbols-light:scan-outline",
    links: [{ url: "/scanner", name: "Máy quét" }],
    children: [
      {
        title: "Máy quét",
        queries: [
          { url: "/scanner/hp", name: "HP" },
          { url: "/scanner/canon", name: "Canon" },
          { url: "/scanner/epson", name: "Epson" },
          { url: "/scanner/brother", name: "Brother" },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          { url: "/scanner/price/2m", name: "Trên 2 triệu" },
          { url: "/scanner/price/5m", name: "Trên 5 triệu" },
          { url: "/scanner/price/7m", name: "Trên 7 triệu" },
        ],
      },
    ],
  },
];

const MenuTree = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="flex bg-white" id="menu-tree__parent">
      <div className="label-menu-tree">
        {data.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(item.id)}
            className="menu-item"
          >
            <LabelItem icon={item.icon} links={item.links} />
          </div>
        ))}
      </div>

      <div className="menu-tree-child-container bg-red-600">
        <div className="menu-tree-child-cols">
          <div className="grid">
            <div className="menu-tree-child-container">
              <div className="menu-tree-child-cols">
                <div className="grid gap-4">
                  {data.map(
                    (item, index) =>
                      activeCategory === item.id && (
                        <div
                          key={index}
                          className="grid grid-cols-6 overflow-hidden"
                        >
                          {item.children.map((child, childIndex) => (
                            <div
                              key={childIndex}
                              className="menu-tree-child-cols__item"
                            >
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
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTree;
