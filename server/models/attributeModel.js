const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  typeOfValue: {
    type: String,
    enum: ["text", "number", "date", "boolean"],
    default: "text",
  },
  values: {
    type: Array,
  },
});

module.exports = mongoose.model("Attribute", attributeSchema);
