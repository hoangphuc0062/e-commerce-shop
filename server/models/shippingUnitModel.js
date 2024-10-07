const mongoose = require("mongoose");

const shippingUnitSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: Array,
  },
  note: {
    type: String,
  },
});

module.exports = mongoose.model("ShippingUnit", shippingUnitSchema);
