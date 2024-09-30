const Series = require("../models/seriesModel");

const asyncHandler = require("express-async-handler");

const getAllCollection = asyncHandler(async (req, res) => {
  const series = await Series.find();

  return res.status(200).json(series);
});

const addSery = asyncHandler(async (req, res) => {
  const { name, brand } = req.body;

  if (!name || !brand) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const series = new Series(req.body);
  await series.save();

  return res.status(200).json({
    mes: "Add sery is successful",
  });
});

const updateSery = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const series = await Series.findByIdAndUpdate(sid, req.body, {
    new: true,
  });
  return res.status(200).json({
    mes: series ? "Update collection is successful" : "Some thing went wrong",
    series,
  });
});

const deleteSery = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const series = await Series.findByIdAndDelete(sid);

  return res.status(200).json({
    mes: series ? "Delete collection is successful" : "Some thing went wrong",
  });
});

module.exports = {
  getAllCollection,
  addSery,
  updateSery,
  deleteSery,
};
