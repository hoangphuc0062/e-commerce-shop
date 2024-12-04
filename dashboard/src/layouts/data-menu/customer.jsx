const menuItems = {
  items: [
    {
      id: "navigation",
      title: "Bảng điều khiển",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard-profile",
          title: "Thông tin cá nhân",
          icon: "feather icon-home",
          type: "item",
          url: "/dashboard/welcome",
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
          id: "tags",
          title: "Tags",
          type: "item",
          icon: "feather icon-tag",
          url: "/dashboard/tags",
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
