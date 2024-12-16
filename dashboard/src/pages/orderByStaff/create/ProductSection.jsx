import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
} from "@mui/material";

import { Icon } from "@iconify/react";
import ImageCarousel from "./ImageCarousel";
import { useDispatch } from "react-redux";
import { handleToast } from "./../../../utils/toast";

const ProductSection = ({ products, onDelete }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeValueIndex, setActiveValueIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAttributeClick = (index, variant) => {
    setActiveIndex(index);
  };

  const handleValueClick = (index, value) => {
    setActiveValueIndex(index);
  };

  const handleAddToCart = () => {
    const selectedVariant = products[0]?.variants?.[activeIndex];
    const selectedValue = selectedVariant?.values?.[activeValueIndex];
    const data = {
      key: selectedVariant?.key,
      productId: products[0]?._id,
      attributeId: selectedValue?.id ?? null,
      quantity: quantity,
      price: selectedValue?.price ?? selectedVariant?.price,
      total: quantity * (selectedValue?.price ?? selectedVariant?.price),
    };
    onDelete();
    localStorage.setItem("cart", JSON.stringify(data));
    handleToast("success", "Thêm vào giỏ hàng thành công");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleQuantityChange = (value) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + value, 1));
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Ensure only valid positive integers are accepted
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue);
    } else if (inputValue === "") {
      setQuantity("");
    }
  };

  const handleInputBlur = () => {
    // Reset to 1 if input is empty on blur
    if (quantity === "") {
      setQuantity(1);
    }
  };
  const data = products[0] || {};
  const dataImg = [
    data?.thumbnail,
    // data?.videos ?? [],
    ...(data?.images ?? []),
    // ...(data?.attributes?.map((attr) => attr.images) ?? []),
  ];
  const DataProduct = data;
  const values = DataProduct?.variants?.[activeIndex]?.values ?? [];
  const total = values.reduce((acc, value) => acc + value.price, 0);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Product Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {data?.name || "Unnamed Product"}
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <ImageCarousel images={dataImg} />
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          {DataProduct?.variants?.length > 1 && (
            <Grid container spacing={2}>
              {DataProduct?.variants?.map((variant, index) => (
                <Grid item xs={6} lg={4} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleAttributeClick(index, variant)}
                    sx={{
                      borderColor:
                        activeIndex === index ? "primary.main" : "grey.300",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography fontWeight="bold">{variant?.key}</Typography>
                      <Typography>{formatCurrency(variant?.price)}</Typography>
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}

          {values?.length > 0 && (
            <Box mt={2}>
              <Typography variant="h6">Chọn màu sắc</Typography>
              <Grid container spacing={2}>
                {values?.map((value, index) => (
                  <Grid item xs={6} md={4} key={index}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleValueClick(index, value)}
                      sx={{
                        borderColor:
                          activeValueIndex === index
                            ? "primary.main"
                            : "grey.300",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 60, height: 60, objectFit: "contain" }}
                        image={value?.thumbnail}
                        alt={value?.name}
                      />
                      <Box>
                        <Typography variant="body2">{value?.name}</Typography>
                        <Typography variant="body2">
                          {formatCurrency(value?.price)}
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {/* Quantity */}
          <Box mt={2}>
            <Typography variant="h6">Số lượng</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleQuantityChange(-1)} // Decrease quantity
            >
              -
            </Button>
            <TextField
              value={quantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              sx={{
                display: "inline-block",
                width: 60,
                margin: "0 8px",
              }}
              inputProps={{
                style: { textAlign: "center" }, // Center-align the text
                min: 1,
              }}
              variant="outlined"
              size="small"
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </Button>
          </Box>

          {/* Price */}
          <Box mt={2}>
            <Typography variant="h5" fontWeight="bold">
              Giá:{" "}
              {formatCurrency(
                values?.[activeValueIndex]?.price ||
                  DataProduct?.variants?.[activeIndex]?.price ||
                  0
              )}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box mt={2} display="flex" gap={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddToCart}
              sx={{ flex: 1 }}
            >
              <Icon icon="solar:cart-plus-outline" fontSize="2rem" />
              <Typography variant="body2">Thêm vào giỏ</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductSection;
