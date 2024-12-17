import sendRequest from "../ultils/request";

const AuthServices = {
  login: (data) => sendRequest("post", "/customers/login", data),
  register: (data) => sendRequest("post", "/customers/register", data),
  logout: () => sendRequest("get", "/customers/logout"),
  getme: () => sendRequest("get", "/customers/get-current"),
  updateCustomer: (id, data) =>
    sendRequest("put", `/customers/user/${id}`, data),
  finalregister: (token) =>
    sendRequest("get", `/customers/finalregister/${token}`),

  // Thêm phương thức đổi mật khẩu
  changePassword: (data) =>
    sendRequest("post", "/customers/change-password", data),

  // Address
  addAddress: (data) => sendRequest("post", "/customers/add-address", data),
  updateAddress: (id, data) =>
    sendRequest("put", `/customers/update-address/${id}`, data),
  deleteAddress: (id) =>
    sendRequest("delete", `/customers/delete-address/${id}`),
  getAddresses: () => sendRequest("get", "/customers/get-address"),

  //  Forget Password
  forgetPassword: (data) =>
    sendRequest("post", "/customers/forgot-password", data),
  resetPassword: (data) =>
    sendRequest("put", "/customers/reset-password", data),
};

export default AuthServices;
