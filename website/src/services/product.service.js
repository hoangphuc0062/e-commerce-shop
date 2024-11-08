import sendRequest from "../ultils/request";

const ProductServices = {
  getProducts: (params) => sendRequest("get", "/products", { params }),

  getProductBySlug: (slug) => sendRequest("get", `/products/slug/${slug}`),
};

export default ProductServices;
