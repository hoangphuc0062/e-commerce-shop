import sendRequest from "../ultils/request";
const customersService ={
    updateCustomer: (id, data) => sendRequest("put", `/customers/user/${id}`, data),
  };
  export default customersService;