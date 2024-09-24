const { registerCustomer } = require("./register");
const { loginCustomer } = require("./login");
const { checkOTP } = require("./checkOTP");
const { logout } = require("./logout");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword } = require("./resetPassword");
const { getCustomer } = require("./getcustomer");
const { deleteCustomer } = require("./deletecustomer");
const { updateCustomer } = require("./updatecustomer");
const { updateCustomerBYAdmin } = require("./updateCustomerByAdmin");
const { refreshAccessToken } = require("./refreshAccessToken");

module.exports = {
  registerCustomer,
  loginCustomer,
  checkOTP,
  logout,
  forgotPassword,
  resetPassword,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  updateCustomerBYAdmin,
  refreshAccessToken,
};
