const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Bảng điều khiển",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "categories",
          title: "Danh mục",
          type: "collapse",
          icon: "feather icon-list",
          children: [
            {
              id: "add-category",
              title: "Thêm danh mục",
              type: "item",
              url: "/dashboard/category/create",
            },
            {
              id: "category-list",
              title: "Danh sách danh mục",
              type: "item",
              url: "/dashboard/category",
            },
          ],
        },
        {
          id: "products",
          title: "Sản phẩm",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "add-product",
              title: "Thêm sản phẩm",
              type: "item",
              url: "/dashboard/product/create",
            },
            {
              id: "product-list",
              title: "Danh sách sản phẩm",
              type: "item",
              url: "/dashboard/product",
            },
          ],
        },
        {
          id: "coupons",
          title: "Mã giảm giá",
          type: "item",
          icon: "feather icon-tag",
          url: "/app/coupons",
        },
        {
          id: "comfig",
          title: "Cấu hình",
          type: "collapse",
          icon: "feather icon-settings",
          children: [
            {
              id: "site-config",
              title: "Cấu hình trang web",
              type: "item",
              url: "/dashboard/config/site-config",
            },
            {
              id: "email-config",
              title: "Cấu hình email",
              type: "item",
              url: "/dashboard/config/email-config",
            },
            {
              id: "payment-config",
              title: "Cấu hình thanh toán",
              type: "item",
              url: "/dashboard/config/payment-config",
            },
            {
              id: "shipping-config",
              title: "Cấu hình vận chuyển",
              type: "item",
              url: "/dashboard/config/shipping-config",
            },
            {
              id: "social-config",
              title: "Cấu hình mạng xã hội",
              type: "item",
              url: "/dashboard/config/social-config",
            },
            {
              id: "other-config",
              title: "Cấu hình khác",
              type: "item",
              url: "/dashboard/config/other-config",
            },
          ],
        },
        {
          id: "warehouse",
          title: "Kho hàng",
          type: "collapse",
          icon: "feather icon-package",
          children: [
            {
              id: "add-warehouse",
              title: "Thêm kho hàng",
              type: "item",
              url: "dashboard/warehouse/create",
            },
            {
              id: "warehouse-list",
              title: "Danh sách kho hàng",
              type: "item",
              url: "dashboard/warehouse",
            },
          ],
        },
        {
          id: "Blogs",
          title: "Bài viết",
          type: "collapse",
          icon: "feather icon-file-text",
          children: [
            {
              id: "add-blog",
              title: "Thêm bài viết",
              type: "item",
              url: "dashboard/blog/create",
            },
            {
              id: "blog-list",
              title: "Danh sách bài viết",
              type: "item",
              url: "dashboard/blog",
            },
          ],
        },
      ],
    },
  ],
};

export default menuItems;
