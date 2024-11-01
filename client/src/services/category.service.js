import sendRequest from "../ultils/request";

const CategoryService = {
  getAll: () => sendRequest("get", "/categories/"),
  getBySlug: (slug) => sendRequest("get", `/categories/${slug}`),
};

export default CategoryService;
