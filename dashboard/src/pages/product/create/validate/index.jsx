// validation.js
export const validateProductData = (productData) => {
  const errors = {};
  if (!productData.name) errors.name = "Name is required";
  if (!productData.slug) errors.slug = "Slug is required";
  if (!productData.SKU) errors.SKU = "SKU is required";
  if (!productData.price) errors.price = "Price is required";
  if (!productData.category) errors.category = "Category is required";
  if (!productData.brand) errors.brand = "Brand is required";
  if (!productData.series) errors.series = "Series is required";
  if (!productData.warehouse) errors.warehouse = "Warehouse is required";
  if (productData.tagsProduct.length === 0)
    errors.tagsProduct = "At least one tag is required";
  return errors;
};

export const validateAttributeData = (attributeData) => {
  const errors = {};
  if (!attributeData.aid) errors.aid = "Attribute ID is required";
  if (!attributeData.value) errors.value = "Value is required";
  if (!attributeData.SKU) errors.SKU = "SKU is required";
  if (!attributeData.price) errors.price = "Price is required";
  return errors;
};
