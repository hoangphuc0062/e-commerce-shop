import sendRequest from "../utils/resquest";

const ProductService = {
  getAll: (page, limit) =>
    sendRequest("get", "/products?page=" + page + "&limit=" + limit),
  delete: (id) => sendRequest("delete", `/products/${id}`),
  create: (data) => sendRequest("post", "/products/create", data),
};

export default ProductService;
