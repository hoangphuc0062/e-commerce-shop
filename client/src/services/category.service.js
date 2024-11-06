import sendRequest from "../ultils/request";

const CategoryService = {
  getAll: () => sendRequest("get", "/categories/"),
};

export default CategoryService;
