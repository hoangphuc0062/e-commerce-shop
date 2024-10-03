const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: Array,
    },
    link_google_map: {
      type: String,
    },
    open_time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
