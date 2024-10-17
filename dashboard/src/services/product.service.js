import sendRequest from "../utils/resquest";

const ProductService = {
  getAll: () => sendRequest("get", "/products/"),
  delete: (id) => sendRequest("delete", `/products/${id}`),
};

export default ProductService;
