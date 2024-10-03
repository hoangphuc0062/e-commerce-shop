const asyncHandler = require("express-async-handler");

const WareHouse = require("../models/wareHouseModel");

const getWareHouses = asyncHandler(async (req, res) => {
  const wareHouses = await WareHouse.find({});
  return res.status(200).json({
    mes: "Get all wareHouses successfully",
    wareHouses,
  });
});

const createWareHouse = asyncHandler(async (req, res) => {
  const { name, address, description } = req.body;
  if (!name || !address) {
    return res.status(400).json({
      mes: "Name and address are required",
    });
  }
  const wareHouse = new WareHouse({
    name,
    address,
    description,
  });
  await wareHouse.save();
  return res.status(201).json({
    mes: "Create wareHouse successfully",
    wareHouse,
  });
});

const updateWareHouse = asyncHandler(async (req, res) => {
  const { wid } = req.params;
  if (!wid || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }

  const wareHouse = await WareHouse.findByIdAndUpdate(wid, req.body);
  return res.status(200).json({
    mes: wareHouse ? "Update wareHouse successfully" : "Some thing went wrong",
    wareHouse,
  });
});

const deleteWareHouse = asyncHandler(async (req, res) => {
  const { wid } = req.params;
  if (!wid) {
    return res.status(400).json({
      mes: "Missing inputs",
    });
  }
  const wareHouse = await WareHouse.findById(wid);
  if (!wareHouse) {
    return res.status(404).json({
      mes: "WareHouse not found",
    });
  } else {
    await wareHouse.deleteOne();
    return res.status(200).json({
      mes: "Delete wareHouse successfully",
    });
  }
});

module.exports = {
  getWareHouses,
  createWareHouse,
  updateWareHouse,
  deleteWareHouse,
};
