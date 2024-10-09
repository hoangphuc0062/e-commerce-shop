import sendRequest from "../utils/resquest";

const CustomerService = {
  getAll: () => sendRequest("get", "/customers/"),
  updateCustomer: (id, data) => sendRequest("put", `/customers/${id}`, data),
};

export default CustomerService;
