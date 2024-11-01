import sendRequest from "../ultils/request";

const AuthServices = {
  login: (data) => sendRequest("post", "/customers/login", data),
  register: (data) => sendRequest("post", "/customers/register", data),
  logout: () => sendRequest("get", "/customers/logout"),
  getme: () => sendRequest("get", "/customers/get-current"),
};

export default AuthServices;
