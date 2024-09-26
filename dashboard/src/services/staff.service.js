import sendRequest from "../utils/resquest";

const StaffService = {
  login: (data) => sendRequest("post", "/staffs/login", { data }),
};

export default StaffService;
