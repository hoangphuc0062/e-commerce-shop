const mongoose = require("mongoose");

const iconSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  className: {
    type: String,
  },
});

module.exports = mongoose.model("Icons", iconSchema);
