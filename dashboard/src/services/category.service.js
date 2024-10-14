import sendRequest from "../utils/resquest";

const CategoryService = {
  getAll: () => sendRequest("get", "/categories/"),
};

export default CategoryService;
