const mongoose = require("mongoose");

var WebConfigSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  logo: {
    type: String,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  facebook: {
    type: String,
  },
  tiktok: {
    type: String,
  },
});

module.exports = mongoose.model("WebConfig", WebConfigSchema);
