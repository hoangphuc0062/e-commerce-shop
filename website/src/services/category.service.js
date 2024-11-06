import sendRequest from "../ultils/request";

const CategoryServices = {
  getAll: () => sendRequest("get", "/categories"),
};

export default CategoryServices;
