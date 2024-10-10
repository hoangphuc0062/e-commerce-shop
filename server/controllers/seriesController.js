const Series = require("../models/seriesModel");

const asyncHandler = require("express-async-handler");

const getAllSeries = asyncHandler(async (req, res) => {
  const series = await Series.find().populate("brand", "name", "");

  return res.status(200).json(series);
});

const addSeries = asyncHandler(async (req, res) => {
  const { name, brand } = req.body;

  if (!name || !brand) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const series = new Series(req.body);
  await series.save();

  return res.status(200).json({
    mes: "Add Series is successful",
  });
});

const updateSeries = asyncHandler(async (req, res) => {
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

const deleteSeries = asyncHandler(async (req, res) => {
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

const deleteManySeries = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw Error("Missing ids to delete");
  }

  const result = await Series.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount === 0) {
    return res.status(400).json({
      mes: "No series found with the provided ids",
    });
  }

  return res.status(200).json({
    mes: "Delete series is successful",
  });
});

module.exports = {
  getAllSeries,
  addSeries,
  updateSeries,
  deleteSeries,
  deleteManySeries,
};
