const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
