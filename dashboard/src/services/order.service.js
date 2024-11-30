import sendRequest from "../utils/resquest";

const OrderService = {
  getAll: () => sendRequest("get", "/orders/"),
  update: (id, data) => sendRequest("put", `/orders/${id}`, data),
};

export default OrderService;
