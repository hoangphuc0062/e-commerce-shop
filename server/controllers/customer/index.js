const { registerCustomer } = require("./register");
const { loginCustomer } = require("./login");
const { checkOTP } = require("./checkOTP");

module.exports = {
  registerCustomer,
  loginCustomer,
  checkOTP,
};
