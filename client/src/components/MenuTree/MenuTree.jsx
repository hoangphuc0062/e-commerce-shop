import { Labeltem } from "./Labeltem";
import { MenuTreeChildren } from "./MenuTreeChildren";

const data = [
  {
    icon: "quill:phone",
    links: [
      {
        url: "/phone",
        name: "Điện thoại,",
      },
      {
        url: "/phone",
        name: "Tablet",
      },
    ],
    children: [
      {
        title: "Điện thoại",
        queries: [
          {
            url: "/phone",
            name: "Samsung",
          },
          {
            url: "/phone",
            name: "Iphone",
          },
          {
            url: "/phone",
            name: "Oppo",
          },
          {
            url: "/phone",
            name: "Xiaomi",
          },
        ],
      },
      {
        title: "Tablet",
        queries: [
          {
            url: "/phone",
            name: "Samsung",
          },
          {
            url: "/phone",
            name: "Iphone",
          },
          {
            url: "/phone",
            name: "Oppo",
          },
          {
            url: "/phone",
            name: "Xiaomi",
          },
          {
            url: "/phone",
            name: "Samsung",
          },
          {
            url: "/phone",
            name: "Iphone",
          },
          {
            url: "/phone",
            name: "Oppo",
          },
          {
            url: "/phone",
            name: "Xiaomi",
          },
          {
            url: "/phone",
            name: "Samsung",
          },
          {
            url: "/phone",
            name: "Iphone",
          },
          {
            url: "/phone",
            name: "Oppo",
          },
          {
            url: "/phone",
            name: "Xiaomi",
          },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          {
            url: "/phone",
            name: "Trên 2 triệu",
          },
          {
            url: "/phone",
            name: "Trên 5 triệu",
          },
          {
            url: "/phone",
            name: "Trên 7 triệu",
          },
        ],
      },
    ],
  },
  {
    icon: "bi:laptop",
    links: [
      {
        url: "/laptop",
        name: "Laptop",
      },
    ],
    children: [
      {
        title: "Laptop",
        queries: [
          {
            url: "/laptop",
            name: "Asus",
          },
          {
            url: "/laptop",
            name: "Dell",
          },
          {
            url: "/laptop",
            name: "HP",
          },
          {
            url: "/laptop",
            name: "Lenovo",
          },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          {
            url: "/laptop",
            name: "Trên 10 triệu",
          },
          {
            url: "/laptop",
            name: "Trên 15 triệu",
          },
          {
            url: "/laptop",
            name: "Trên 20 triệu",
          },
        ],
      },
    ],
  },
  {
    icon: "bi:smartwatch",
    links: [
      {
        url: "/smartwatch",
        name: "Đồng hồ",
      },
    ],
    children: [
      {
        title: "Đồng hồ",
        queries: [
          {
            url: "/smartwatch",
            name: "Apple",
          },
          {
            url: "/smartwatch",
            name: "Samsung",
          },
          {
            url: "/smartwatch",
            name: "Xiaomi",
          },
          {
            url: "/smartwatch",
            name: "Huawei",
          },
        ],
      },
      {
        title: "Mức giá",
        queries: [
          {
            url: "/smartwatch",
            name: "Trên 5 triệu",
          },
          {
            url: "/smartwatch",
            name: "Trên 10 triệu",
          },
          {
            url: "/smartwatch",
            name: "Trên 15 triệu",
          },
        ],
      },
    ],
  },
];

const MenuTree = () => {
  return (
    <div className="flex bg-white" id="menu-tree__parent">
      <div className="label-menu-tree">
        {data &&
          data.map((item, index) => (
            <Labeltem key={index} icon={item.icon} links={item.links} />
          ))}
      </div>
      <div className="menu-tree-child-container">
        <div className="menu-tree-child-cols">
          <div className="grid grid-cols-5">
            {data &&
              data.map((item, index) => (
                <MenuTreeChildren key={index} children={item.children} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTree;
