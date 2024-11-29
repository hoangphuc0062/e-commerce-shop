import sendRequest from "../ultils/request";

const AuthServices = {
  login: (data) => sendRequest("post", "/customers/login", data),
  register: (data) => sendRequest("post", "/customers/register", data),
  logout: () => sendRequest("get", "/customers/logout"),
  getme: () => sendRequest("get", "/customers/get-current"),
  updateCustomer: (id, data) => sendRequest("put", `/customers/user/${id}`, data),
  finalregister: (token) =>
    sendRequest("get", `/customers/finalregister/${token}`),

  // Thêm phương thức đổi mật khẩu
  updatePassword: (data) =>
    sendRequest("post", "/customers/update-password", data),
};

export default AuthServices;

