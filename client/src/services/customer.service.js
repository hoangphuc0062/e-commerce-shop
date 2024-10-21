import sendRequest from "../ultils/request";

const CustomerService = {
  getCustomer: () => sendRequest("get", "/customers/get-current"),
  login: (data) => sendRequest("post", "/customers/login", data),
  registerCustomer: (data) => sendRequest("post", "/customers/register", data),
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
  deleteCustomer: (id) => sendRequest("delete", `/customers/${id}`),
};

export default CustomerService;
