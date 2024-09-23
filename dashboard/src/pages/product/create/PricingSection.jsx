import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function PricingSection({
  productDetails,
  handleInputChange,
  handleSwitchChange,
}) {
  return (
    <Paper elevation={3} sx={{ padding: 5 }}>
      <Typography variant="h6">Giá cả</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Giá gốc"
            name="basePrice"
            value={productDetails.basePrice}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Giá khuyến mãi"
            name="discountedPrice"
            value={productDetails.discountedPrice}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={productDetails.chargeTax}
                onChange={handleSwitchChange}
                name="chargeTax"
              />
            }
            label="Thuế"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={productDetails.inStock}
                onChange={handleSwitchChange}
                name="inStock"
              />
            }
            label="Còn hàng"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
