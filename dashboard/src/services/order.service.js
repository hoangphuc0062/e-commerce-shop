import sendRequest from "../utils/resquest";

const OrderService = {
  getAll: () => sendRequest("get", "/orders/"),
  update: (id, data) => sendRequest("put", `/orders/${id}`, data),
  create: (data) => sendRequest("post", "/orders/create-in-store-order", data),
};

export default OrderService;
