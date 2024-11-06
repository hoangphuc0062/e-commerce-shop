import sendRequest from "../ultils/request";

const ProductServices = {
  getProducts: (params) => sendRequest("get", "/products", { params }),
};

export default ProductServices;
