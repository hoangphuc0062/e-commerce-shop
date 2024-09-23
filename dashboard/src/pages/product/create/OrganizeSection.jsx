import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function OrganizeSection({ productDetails, handleInputChange }) {
  return (
    <Paper elevation={3} sx={{ padding: 5, mt: 4 }}>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Tổ chức</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Nhà cung cấp</InputLabel>
            <Select
              name="vendor"
              value={productDetails.vendor}
              onChange={handleInputChange}
            >
              <MenuItem value="Vendor1">Vendor1</MenuItem>
              <MenuItem value="Vendor2">Vendor2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>danh mục</InputLabel>
            <Select
              name="category"
              value={productDetails.category}
              onChange={handleInputChange}
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Bộ sưu tập</InputLabel>
            <Select
              name="collection"
              value={productDetails.collection}
              onChange={handleInputChange}
            >
              <MenuItem value="Summer">Summer</MenuItem>
              <MenuItem value="Winter">Winter</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              name="status"
              value={productDetails.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Thẻ"
            name="tags"
            value={productDetails.tags}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
