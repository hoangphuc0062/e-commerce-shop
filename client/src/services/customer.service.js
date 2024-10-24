import sendRequest from "../ultils/request";

const CustomerService = {
  getCustomer: () => sendRequest("get", "/customers/get-current"),
  login: (data) => sendRequest("post", "/customers/login", data),
<<<<<<< HEAD
  register: (data) => sendRequest("post", "/customers/register", data),
=======
  forgotPassword: (data) =>
    sendRequest("post", "/customers/forgot-password", data),
  registerCustomer: (data) => sendRequest("post", "/customers/register", data),
>>>>>>> parent of 59a1a95 (Merge pull request #369 from hoangphuc0062/dev)
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
  deleteCustomer: (id) => sendRequest("delete", `/customers/${id}`),
};

export default CustomerService;
