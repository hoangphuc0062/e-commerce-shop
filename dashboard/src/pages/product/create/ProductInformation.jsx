import { Grid, Paper, TextField } from "@mui/material";
import Textarea from "../../../components/textarea";

export default function ProductInformation({
  productDetails,
  handleInputChange,
}) {
  return (
    <Paper elevation={3} sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            name="productName"
            value={productDetails.productName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mã sản phẩm"
            name="sku"
            value={productDetails.sku}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Textarea
            label="Mô tả sản phẩm"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            height={400}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
