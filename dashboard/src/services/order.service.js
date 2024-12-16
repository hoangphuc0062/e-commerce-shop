import sendRequest from "../utils/resquest";

const OrderService = {
  getAll: () => sendRequest("get", "/orders/"),
  update: (id, data) => sendRequest("put", `/orders/${id}`, data),
  create: (data) => sendRequest("post", "/orders/create-in-store-order", data),
  VnPay: (data) =>
    sendRequest("post", "/orders/create-payment-url-By-Order-Staff", data),
  delete: (id) => sendRequest("delete", `/orders/${id}`),
};

export default OrderService;
