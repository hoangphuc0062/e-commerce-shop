import sendRequest from "../utils/resquest";

const CustomerService = {
  getAll: () => sendRequest("get", "/customers/"),
};

export default CustomerService;
