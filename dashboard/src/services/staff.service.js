import sendRequest from "../utils/resquest";

const StaffService = {
  login: (data) => sendRequest("post", "/staffs/login", data),
  getAll: () => sendRequest("get", "/staffs/"),
  createStaff: (data) => sendRequest("post", "/staffs/register", data),
  deleteStaff: (id) => sendRequest("delete", `/staffs/${id}`),
  updateStaff: (id, data) => sendRequest("put", `/staffs/${id}`, data),
  getStaffById: (id) => sendRequest("get", `/staffs/${id}`),
};

export default StaffService;
