import { TextField, Grid } from "@mui/material";

export default function PriceProduct({ productData, handleInputChange }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Giá gốc"
          fullWidth
          value={productData.historicalPrice}
          onChange={(e) => handleInputChange("historicalPrice", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giá thị trường"
          fullWidth
          value={productData.priceInMarket}
          onChange={(e) => handleInputChange("priceInMarket", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giá cửa hàng"
          fullWidth
          value={productData.priceInStore}
          onChange={(e) => handleInputChange("priceInStore", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giá online"
          fullWidth
          value={productData.priceOnline}
          onChange={(e) => handleInputChange("priceOnline", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Giảm giá"
          fullWidth
          value={productData.discount}
          onChange={(e) => handleInputChange("discount", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
