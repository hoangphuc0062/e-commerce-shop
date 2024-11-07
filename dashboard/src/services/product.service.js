import sendRequest from "../utils/resquest";

const ProductService = {
  getAll: () =>
    sendRequest("get", "/products", {
      params: {
        sort: "-createdAt",
      },
    }),
  delete: (id) => sendRequest("delete", `/products/${id}`),
  create: (data) => sendRequest("post", "/products/create", data),
  update: (id, data) => sendRequest("put", `/products/${id}`, data),
  getById: (id) => sendRequest("get", `/products?_id=${id}`),
};

export default ProductService;
