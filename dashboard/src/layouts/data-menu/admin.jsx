const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Bảng điều khiển",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Quản lý",
          type: "collapse",
          icon: "feather icon-home",
          children: [
            {
              id: "dashboard-profile",
              title: "Thông tin cá nhân",
              type: "item",
              url: "/dashboard/welcome",
            },
            {
              id: "dashboard-home",
              title: "Thống kê",
              type: "item",
              url: "/dashboard",
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
              id: "product-list",
              title: "Danh sách sản phẩm",
              type: "item",
              url: "/dashboard/product",
            },
            {
              id: "add-product",
              title: "Thêm sản phẩm",
              type: "item",
              url: "/dashboard/product/create",
            },
          ],
        },
        {
          id: "filter",
          title: "Bộ lọc",
          type: "collapse",
          icon: "feather icon-filter",
          children: [
            {
              id: "filter-list",
              title: "Danh sách bộ lọc",
              type: "item",
              url: "/dashboard/filter",
            },
            {
              id: "add-filter",
              title: "Thêm bộ lọc",
              type: "item",
              url: "/dashboard/filter/create",
            },
          ],
        },
        {
          id: "orders",
          title: "Đơn hàng",
          type: "collapse",
          icon: "feather icon-server",
          children: [
            {
              id: "all-orders",
              title: "Tất cả đơn hàng",
              type: "item",
              url: "/dashboard/order",
            },
            {
              id: "Create-orderByStaff",
              title: "Tạo đơn hàng",
              type: "item",
              url: "/dashboard/orderByStaff/create",
            },
          ],
        },
        {
          id: "categories",
          title: "Danh mục",
          type: "collapse",
          icon: "feather icon-list",
          children: [
            {
              id: "category-list",
              title: "Danh sách danh mục",
              type: "item",
              url: "/dashboard/category",
            },
            {
              id: "add-category",
              title: "Thêm danh mục",
              type: "item",
              url: "/dashboard/category/create",
            },
          ],
        },
        {
          id: "brands",
          title: "Thương hiệu",
          type: "collapse",
          icon: "feather icon-award",
          children: [
            {
              id: "brand-list",
              title: "Danh sách thương hiệu",
              type: "item",
              url: "/dashboard/brand",
            },
          ],
        },
        {
          id: "collections",
          title: "Bộ sưu tập",
          type: "collapse",
          icon: "feather icon-book",
          children: [
            {
              id: "collection-list",
              title: "Danh sách bộ sưu tập",
              type: "item",
              url: "/dashboard/collection",
            },
          ],
        },

        {
          id: "personnel",
          title: "Nhân viên",
          type: "collapse",
          icon: "feather icon-user",
          children: [
            {
              id: "personnel-list",
              title: "Danh sách nhân viên",
              type: "item",
              url: "/dashboard/staff",
            },
            {
              id: "add-personnel",
              title: "Thêm nhân viên",
              type: "item",
              url: "/dashboard/staff/create",
            },
          ],
        },
        {
          id: "customers",
          title: "Khách hàng",
          type: "collapse",
          icon: "feather icon-users",
          children: [
            {
              id: "all-customers",
              title: "Tất cả khách hàng",
              type: "item",
              url: "/dashboard/customer",
            },
          ],
        },
        {
          id: "coupons",
          title: "Mã giảm giá",
          type: "item",
          icon: "feather icon-tag",
          url: "/dashboard/coupons",
        },
        {
          id: "tags",
          title: "Tags",
          type: "item",
          icon: "feather icon-tag",
          url: "/dashboard/tags",
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
              url: "/dashboard/webconfig",
            },
            {
              id: "email-config",
              title: "Cấu hình banner",
              type: "item",
              url: "/dashboard/bannercollection",
            },
            {
              id: "payment-config",
              title: "Cấu hình thanh toán",
              type: "item",
              url: "/dashboard/paymentconfig",
            },
            {
              id: "shipping-config",
              title: "Cấu hình vận chuyển",
              type: "item",
              url: "/dashboard/shippingConfig",
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
              id: "warehouse-list",
              title: "Danh sách kho hàng",
              type: "item",
              url: "/dashboard/warehouse",
            },
            {
              id: "add-warehouse",
              title: "Thêm kho hàng",
              type: "item",
              url: "/dashboard/warehouse/create",
            },
          ],
        },
        {
          id: "Post",
          title: "Bài đăng",
          type: "collapse",
          icon: "feather icon-file-text",
          children: [
            {
              id: "post-list",
              title: "Danh sách bài đăng",
              type: "item",
              url: "/dashboard/post",
            },
            {
              id: "add-blog",
              title: "Thêm bài viết",
              type: "item",
              url: "/dashboard/post/create",
            },
          ],
        },

        {
          id: "auth",
          title: "Tài khoản",
          type: "collapse",
          icon: "feather icon-lock",
          children: [
            {
              id: "login",
              title: "Đăng nhập",
              type: "item",
              url: "/",
            },
          ],
        },
      ],
    },
  ],
};

export default menuItems;
