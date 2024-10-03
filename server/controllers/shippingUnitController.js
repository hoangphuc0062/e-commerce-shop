const asyncHandler = require("express-async-handler");

const ShippingUnit = require("../models/shippingUnitModel");

const getShippingUnits = asyncHandler(async (req, res) => {
  const shippingUnits = await ShippingUnit.find({});
  return res.status(200).json({
    mes: "Get all shipping units successfully",
    shippingUnits,
  });
});

const createShippingUnit = asyncHandler(async (req, res) => {
  const { name, address, note } = req.body;
  if (!name || !address) {
    return res.status(400).json({
      mes: "Missing required fields",
    });
  }
  const shippingUnit = new ShippingUnit({
    name,
    address,
    note,
  });
  await shippingUnit.save();
  return res.status(201).json({
    mes: "Create shipping unit successfully",
    shippingUnit,
  });
});

const updateShippingUnit = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing required fields",
    });
  }
  const shippingUnit = await ShippingUnit.findByIdAndUpdate(sid, req.body, {
    new: true,
  });
  return res.status(200).json({
    mes: shippingUnit
      ? "Update shipping unit successfully"
      : "Something went wrong",
  });
});

const deleteShippingUnit = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  if (!sid) {
    return res.status(400).json({
      mes: "Missing required fields",
    });
  }
  const shippingUnit = await ShippingUnit.findById(sid);
  if (!shippingUnit) {
    return res.status(404).json({
      mes: "Shipping unit not found",
    });
  } else {
    await shippingUnit.deleteOne();
    return res.status(200).json({
      mes: "Delete shipping unit successfully",
    });
  }
});

module.exports = {
  getShippingUnits,
  createShippingUnit,
  updateShippingUnit,
  deleteShippingUnit,
};
