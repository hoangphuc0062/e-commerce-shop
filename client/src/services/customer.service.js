import sendRequest from "../ultils/request";

const CustomerService = {
  getCustomer: () => sendRequest("get", "/customers/get-current"),
  login: (data) => sendRequest("post", "/customers/login", data),
  forgotPassword: (data) =>
    sendRequest("post", "/customers/forgot-password", data),
  registerCustomer: (data) => sendRequest("post", "/customers/register", data),
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
  deleteCustomer: (id) => sendRequest("delete", `/customers/${id}`),
};

export default CustomerService;
