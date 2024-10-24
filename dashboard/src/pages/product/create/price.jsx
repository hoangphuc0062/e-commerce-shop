/* eslint-disable react/prop-types */
import { TextField, Grid, InputAdornment } from "@mui/material";

export default function PriceProduct({ productData, handleInputChange }) {
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
        />
      </Grid>
    </Grid>
  );
}
