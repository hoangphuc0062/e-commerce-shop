const mongoose = require("mongoose");

const bannerCollectionSchema = new mongoose.Schema({
  series_id: {
    type: mongoose.Types.ObjectId,
    ref: "Seri",
  },
  banner: {
    type: Array,
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
  priorty_level: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  end_Date: {
    type: Date,
  },
});

module.exports = mongoose.model("BannerCollection", bannerCollectionSchema);
