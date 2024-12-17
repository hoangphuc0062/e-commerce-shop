import sendRequest from "../ultils/request";

const OrderServices = {
  createOrder: (data) => sendRequest("post", "/orders/", data),
  vnPay: (data) => sendRequest("post", "/orders/create-payment-url", data),
  returnOrder: (params) =>
    sendRequest("get", "/orders/vnpay-return", {
      params,
    }),

  sendMail: () => sendRequest("post", "/orders/send-mail"),
  trackingOrder(sku) {
    return sendRequest("get", `orders/code/${sku}`);
  },

  getOrderByUser: () => sendRequest("get", "/orders/user"),
  update: (id, data) => sendRequest("put", `/orders/${id}`, data),
};

export default OrderServices;
