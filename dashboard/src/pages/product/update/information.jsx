import {
  Card,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Textarea from "../../../components/textarea";

export default function InformationEdit({ formik, warehouseSelect }) {
  return (
    <>
      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Thông tin sản phẩm</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Tên sản phẩm"
              fullWidth
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Slug"
              fullWidth
              value={formik.values.slug || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="slug"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="SKU"
              fullWidth
              value={formik.values.SKU || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="SKU"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Trọng lượng"
              fullWidth
              value={formik.values.weight || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="sold"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Đơn vị"
              fullWidth
              value={formik.values.unit || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="unit"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tồn kho"
              fullWidth
              value={formik.values.inStock || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="inStock"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng hàng đang về"
              fullWidth
              value={formik.values.inComing || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="inComing"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng có thể bán"
              fullWidth
              value={formik.values.onStock || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="onStock"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tối thiểu"
              fullWidth
              value={formik.values.minInventory || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="minInventory"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tối đa"
              fullWidth
              value={formik.values.maxInventory || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="maxInventory"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="warehouse-label">Kho</InputLabel>
              <Select
                labelId="warehouse-label"
                label="Kho"
                value={formik.values.warehouse || ""}
                onChange={formik.handleChange}
              >
                {warehouseSelect.map((warehouse) => (
                  <MenuItem key={warehouse.value} value={warehouse.value}>
                    {warehouse.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isBattery}
                  onChange={formik.handleChange}
                />
              }
              label="Có pin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isStopSelling}
                  onChange={formik.handleChange}
                />
              }
              label="Ngừng bán"
            />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Giá sản phẩm</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá gốc"
              fullWidth
              value={formik.values.historicalPrice || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="historicalPrice"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá thị trường"
              fullWidth
              value={formik.values.priceInMarket || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="priceInMarket"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá"
              fullWidth
              value={formik.values.price || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="price"
              InputProps={{
                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Textarea
              label="Mô tả ngắn"
              name="shortDescription"
              value={formik.values.shortDescription || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <Textarea
              name="description"
              label="Mô tả sản phẩm"
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
