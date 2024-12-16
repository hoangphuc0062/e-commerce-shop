import sendRequest from "../ultils/request";

const ProductServices = {
  getProducts: (params) => sendRequest("get", "/products", { params }),

  getProductBySlug: (slug) => sendRequest("get", `/products/slug/${slug}`),

  compareProduct: (data) => sendRequest("get", "/products/compare", { data }),
};

export default ProductServices;
