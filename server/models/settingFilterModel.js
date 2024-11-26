const mongoose = require("mongoose");

const settingFilterSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    filter: [
      {
        label: { type: String, required: true },
        key: { type: String, required: true },
        values: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SettingFilter", settingFilterSchema);
