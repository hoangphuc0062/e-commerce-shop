import * as Yup from "yup";

export const validationProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
  SKU: Yup.string().required("SKU is required"),
  historicalPrice: Yup.number()
    .required("Historical price is required")
    .min(0, "Must be greater than or equal to 0"),
  priceInMarket: Yup.number()
    .required("Price in market is required")
    .min(0, "Must be greater than or equal to 0"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Must be greater than or equal to 0"),
  discount: Yup.number()
    .required("Discount is required")
    .min(0, "Must be greater than or equal to 0"),
  onStock: Yup.number()
    .required("On stock is required")
    .min(0, "Must be greater than or equal to 0"),
  inStock: Yup.number()
    .required("In stock is required")
    .min(0, "Must be greater than or equal to 0"),
  inComing: Yup.number()
    .required("In coming is required")
    .min(0, "Must be greater than or equal to 0"),
  unit: Yup.string().required("Unit is required"),
  minInventory: Yup.number()
    .required("Min inventory is required")
    .min(0, "Must be greater than or equal to 0"),
  maxInventory: Yup.number()
    .required("Max inventory is required")
    .min(0, "Must be greater than or equal to 0"),
  weight: Yup.number()
    .required("Weight is required")
    .min(0, "Must be greater than or equal to 0"),
  isBattery: Yup.boolean().required("Battery status is required"),
  isStopSelling: Yup.boolean().required("Stop selling status is required"),
  description: Yup.string().required("Description is required"),
  shortDescription: Yup.string().required("Short description is required"),
  keywords: Yup.string().required("Keywords are required"),
  titleSEO: Yup.string().required("Title SEO is required"),
  descriptionSEO: Yup.string().required("Description SEO is required"),
  series: Yup.string().required("Series is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  attributes: Yup.array().of(
    Yup.object().shape({
      aid: Yup.string().required("Attribute ID is required"),
      value: Yup.string().required("Value is required"),
      SKU: Yup.string().required("SKU is required"),
      historicalPrice: Yup.number()
        .required("Historical price is required")
        .min(0, "Must be greater than or equal to 0"),
      priceInMarket: Yup.number()
        .required("Price in market is required")
        .min(0, "Must be greater than or equal to 0"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Must be greater than or equal to 0"),
      discount: Yup.number()
        .required("Discount is required")
        .min(0, "Must be greater than or equal to 0"),
      onStock: Yup.number()
        .required("On stock is required")
        .min(0, "Must be greater than or equal to 0"),
      inStock: Yup.number()
        .required("In stock is required")
        .min(0, "Must be greater than or equal to 0"),
      inComing: Yup.number()
        .required("In coming is required")
        .min(0, "Must be greater than or equal to 0"),
      unit: Yup.string().required("Unit is required"),
      minInventory: Yup.number()
        .required("Min inventory is required")
        .min(0, "Must be greater than or equal to 0"),
      maxInventory: Yup.number()
        .required("Max inventory is required")
        .min(0, "Must be greater than or equal to 0"),
    })
  ),
  specifications: Yup.array().of(
    Yup.string().required("Specification is required")
  ),
});
