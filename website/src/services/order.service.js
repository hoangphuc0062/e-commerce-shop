import sendRequest from "../ultils/request";

const OrderServices = {
  createOrder: (data) => sendRequest("post", "/orders/", data),
  vnPay: (data) => sendRequest("post", "/orders/create-payment-url", data),
  returnOrder: (params) =>
    sendRequest("get", "/orders/vnpay-return", {
      params,
    }),

  sendMail: () => sendRequest("post", "/orders/send-mail"),
};

export default OrderServices;
