import sendRequest from "../ultils/request";

const CategoryServices = {
  getAll: () => sendRequest("get", "/categories"),
  getBySlug: (slug) => sendRequest("get", `/categories/slug/${slug}`),
};

export default CategoryServices;
