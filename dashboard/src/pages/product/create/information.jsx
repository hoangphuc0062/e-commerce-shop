import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Textarea from "../../../components/textarea";

export default function Information({ productData, handleInputChange }) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={4}>
        <TextField
          label="Tên sản phẩm"
          fullWidth
          value={productData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Slug"
          fullWidth
          value={productData.slug}
          onChange={(e) => handleInputChange("slug", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="SKU"
          fullWidth
          value={productData.SKU}
          onChange={(e) => handleInputChange("SKU", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Trọng lượng"
          fullWidth
          value={productData.weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Số lượng tồn"
          fullWidth
          value={productData.onStock}
          onChange={(e) => handleInputChange("onStock", e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="unit">Đơn vị</InputLabel>
          <Select
            labelId="unit"
            value={productData.unit}
            label="Đơn vị"
            onChange={(e) => handleInputChange("unit", e.target.value)}
          >
            <MenuItem value="kg">Kilogram (kg)</MenuItem>
            <MenuItem value="g">Gram (g)</MenuItem>
            <MenuItem value="mg">Miligram (mg)</MenuItem>
            <MenuItem value="l">Lít (l)</MenuItem>
            <MenuItem value="ml">Mililit (ml)</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Textarea
          label="Mô tả ngắn"
          value={productData.shortDescription}
          onChange={(e) =>
            handleInputChange("shortDescription", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={6}>
        <Textarea
          label="Mô tả sản phẩm"
          value={productData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
