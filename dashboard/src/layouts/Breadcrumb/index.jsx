import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import menuItems from "../data-menu/superadmin";
import matchDynamicUrl from "./matchDynamicUrl";
import extraTitles from "./extraTitles";

const generateCustomTitles = (menuItems) => {
  let titles = {};

  const traverseMenu = (items) => {
    items.forEach((item) => {
      if (item.url) {
        titles[item.url] = item.title;
      }

      if (item.children) {
        traverseMenu(item.children);
      }
    });
  };

  traverseMenu(menuItems.items);
  return titles;
};

const menuTitles = generateCustomTitles(menuItems);

const Breadcrumb = () => {
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Tách URL thành các phần
    const segments = location.pathname.split("/").filter(Boolean);

    // Tạo ra các URL tuần tự từ gốc đến cuối (vd: /dashboard, /dashboard/category, ...)
    const pathArray = segments.map((_, index) => {
      return `/${segments.slice(0, index + 1).join("/")}`;
    });

    // Ánh xạ từng URL với tiêu đề trong menuTitles và extraTitles
    const breadcrumb = pathArray.map((url, index) => {
      const titleFromMenu = menuTitles[url];
      const titleFromExtra = extraTitles[url];
      const dynamicTitle = matchDynamicUrl(url);

      // Kiểm tra nếu URL cuối cùng là động và đã có tiêu đề
      if (dynamicTitle && index === pathArray.length - 1) {
        return { url, title: dynamicTitle };
      }

      // Nếu không phải URL cuối hoặc là phần cố định, sử dụng tiêu đề từ menuItems hoặc extraTitles
      return {
        url,
        title:
          titleFromMenu ||
          titleFromExtra ||
          (index === pathArray.length - 1 ? dynamicTitle : url),
      };
    });

    // Bỏ qua các mục không có tiêu đề rõ ràng (ví dụ: /dashboard/category/update)
    const filteredBreadcrumb = breadcrumb.filter(
      (item) => item.title !== item.url
    );

    setBreadcrumbPath(filteredBreadcrumb);
  }, [location.pathname]);

  if (!breadcrumbPath.length) return null;

  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="page-header-title">
              <h5 className="m-b-10">
                {breadcrumbPath[breadcrumbPath.length - 1].title}
              </h5>
            </div>
            <ListGroup as="ul" bsPrefix=" " className="breadcrumb">
              {breadcrumbPath.map((crumb, index) => (
                <ListGroup.Item
                  as="li"
                  bsPrefix=" "
                  className="breadcrumb-item"
                  key={index}
                >
                  {crumb.url === "/dashboard" ? (
                    <Link to="/dashboard">
                      <i className="feather icon-home" />
                    </Link>
                  ) : index < breadcrumbPath.length - 1 ? (
                    <Link to={crumb.url}>{crumb.title}</Link>
                  ) : (
                    <span>{crumb.title}</span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
