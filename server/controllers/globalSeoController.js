const asyncHandler = require("express-async-handler");

const GlobalSeo = require("../models/globalSeoModel");

const getGlobalSeo = asyncHandler(async (req, res) => {
  const globalSeo = await GlobalSeo.find({});

  return res.status(200).json({
    mes: "Get global seo success",
    globalSeo,
  });
});

const updateGlobalSeo = asyncHandler(async (req, res) => {
  const { gbs } = req.params;
  if (!gbs || Object.keys(gbs).length === 0) {
    return res.status(400).json({
      mes: "Missing global seo",
    });
  }
  const globalSeo = await GlobalSeo.findByIdAndUpdate(gbs, req.body);
  return res.status(200).json({
    mes: globalSeo ? "Update global seo successfully" : "Some thing went wrong",
    globalSeo,
  });
});

const createGlobalSeo = asyncHandler(async (req, res) => {
  const { seoKeywords, seoTitle, metaDescription, seoDescription } = req.body;
  if (!seoKeywords || !seoTitle || !metaDescription || !seoDescription) {
    return res.status(400).json({
      mes: "Missing required fields",
    });
  }
  const globalSeo = new GlobalSeo({
    seoKeywords,
    seoTitle,
    metaDescription,
    seoDescription,
  });
  await globalSeo.save();
  return res.status(201).json({
    mes: "Create global seo successfully",
    globalSeo,
  });
});

const deleteGlobalSeo = asyncHandler(async (req, res) => {
  const { gbs } = req.params;
  if (!gbs) {
    return res.status(400).json({
      mes: "Missing global seo",
    });
  }
  const globalSeo = await GlobalSeo.findByIdAndDelete(gbs);
  return res.status(200).json({
    mes: globalSeo ? "Delete global seo successfully" : "Some thing went wrong",
    globalSeo,
  });
});

module.exports = {
  getGlobalSeo,
  updateGlobalSeo,
  createGlobalSeo,
  deleteGlobalSeo,
};
