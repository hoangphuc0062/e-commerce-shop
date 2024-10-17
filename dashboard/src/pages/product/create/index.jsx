import { useState } from "react";
import { Grid, Box, Paper } from "@mui/material";
import ProductInformation from "./ProductInformation";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import PricingSection from "./PricingSection";
import OrganizeSection from "./OrganizeSection";
import FormButtons from "./FormButtons";
import Specifications from "./specifications";

export default function CreateProductForm() {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    sku: "",
    description: "",
    basePrice: "",
    discountedPrice: "",
    chargeTax: false,
    inStock: true,
    vendor: "",
    category: "",
    collection: "",
    status: "",
    tags: "",
    variants: [{ type: "", value: "" }],
    images: [],
    Specifications: [{ NameTT: "", ValueTT: "", TypeTT: "" }],
  });

  const dataVariants = {
    type: ["size", "color", "weight"],
    value: {
      size: ["S", "M", "L", "XL"],
      color: ["Red", "Blue", "Green", "Black", "White"],
      weight: ["1kg", "2kg", "3kg"],
    },
  };

  const dataSpecifications = {
    NameTT: ["Màu sắc", "Kích thước", "Trọng lượng"],
    ValueTT: {
      "Màu sắc": ["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"],
      "Kích thước": ["S", "M", "L", "XL"],
      "Trọng lượng": ["1kg", "2kg", "3kg"],
    },
    TypeTT: ["text", "array", "number"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProductDetails({ ...productDetails, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(productDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Grid container spacing={2}>
          {/* Left Side */}
          <Grid item xs={12} md={8}>
            <ProductInformation
              productDetails={productDetails}
              handleInputChange={handleInputChange}
            />
            <ProductImages
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />
            <ProductVariants
              dataVariants={dataVariants}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={4}>
            <PricingSection
              productDetails={productDetails}
              handleInputChange={handleInputChange}
              handleSwitchChange={handleSwitchChange}
            />
            <OrganizeSection
              productDetails={productDetails}
              handleInputChange={handleInputChange}
            />
            <Specifications
              productDetails={productDetails}
              handleInputChange={handleInputChange}
              handleSwitchChange={handleSwitchChange}
              setProductDetails={setProductDetails}
              dataSpecifications={dataSpecifications}
            />
          </Grid>
        </Grid>

        {/* Form Buttons */}
        <FormButtons handleSubmit={handleSubmit} />
      </Box>
    </form>
  );
}
