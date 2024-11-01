/* eslint-disable react/prop-types */
import { TextField, Grid, InputAdornment } from "@mui/material";

export default function PriceProduct({
  productData,
  handleInputChange,
  isSubmitted,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Giá gốc"
          fullWidth
          value={productData.historicalPrice}
          onChange={(e) => handleInputChange("historicalPrice", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={
            isSubmitted && (
              !productData.historicalPrice ||
              isNaN(productData.historicalPrice) ||
              Number(productData.historicalPrice) <= 0 ||
              Number(productData.historicalPrice) > 1000000
            )
          }
          helperText={
            isSubmitted && (
              !productData.historicalPrice
                ? "Giá gốc không được để trống"
                : isNaN(productData.historicalPrice)
                  ? "Giá gốc phải là một số hợp lệ"
                  : Number(productData.historicalPrice) <= 0
                    ? "Giá gốc phải lớn hơn 0"
                    : Number(productData.historicalPrice) > 1000000
                      ? "Giá gốc không được vượt quá 1,000,000"
                      : ""
            )
          }
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Giá thị trường"
          fullWidth
          value={productData.priceInMarket}
          onChange={(e) => handleInputChange("priceInMarket", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={
            isSubmitted && (
              !productData.priceInMarket ||
              isNaN(productData.priceInMarket) ||
              Number(productData.priceInMarket) <= 0 ||
              Number(productData.priceInMarket) > 1000000
            )
          }
          helperText={
            isSubmitted && (
              !productData.priceInMarket
                ? "Giá thị trường không được để trống"
                : isNaN(productData.priceInMarket)
                  ? "Giá thị trường phải là một số hợp lệ"
                  : Number(productData.priceInMarket) <= 0
                    ? "Giá thị trường phải lớn hơn 0"
                    : Number(productData.priceInMarket) > 1000000
                      ? "Giá thị trường không được vượt quá 1,000,000"
                      : ""
            )
          }
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Giá"
          fullWidth
          value={productData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          }}
          error={
            isSubmitted && (
              !productData.price ||
              isNaN(productData.price) ||
              Number(productData.price) <= 0 ||
              Number(productData.price) > 1000000
            )
          }
          helperText={
            isSubmitted && (
              !productData.price
                ? "Giá không được để trống"
                : isNaN(productData.price)
                  ? "Giá phải là một số hợp lệ"
                  : Number(productData.price) <= 0
                    ? "Giá phải lớn hơn 0"
                    : Number(productData.price) > 1000000
                      ? "Giá không được vượt quá 1,000,000"
                      : ""
            )
          }
        />
      </Grid>
    </Grid>

  );
}
