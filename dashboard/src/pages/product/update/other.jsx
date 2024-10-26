/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function OtherProductEdit({
  formik,
  handleInputChange,
  brandSelect,
  seriesSelect,
  categorySelect,
  tagsProduct,
}) {
  return (
    <Card sx={{ mt: 2, p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Thông tin danh mục</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="category">Danh mục</InputLabel>
            <Select
              labelId="category"
              value={formik.values.category}
              label="Danh mục"
              onChange={formik.handleChange}
              name="category"
              onBlur={formik.handleBlur}
            >
              {categorySelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="brand">Thương hiệu</InputLabel>
            <Select
              labelId="brand"
              value={formik.values.brand}
              label="Thương hiệu"
              onChange={formik.handleChange}
              name="brand"
              onBlur={formik.handleBlur}
            >
              {brandSelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="series">Dòng sản phẩm</InputLabel>
            <Select
              labelId="series"
              value={formik.values.series}
              label="Dòng sản phẩm"
              onChange={formik.handleChange}
              name="series"
            >
              {seriesSelect.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              options={tagsProduct}
              getOptionLabel={(option) => option.label}
              value={formik.values.tagsProduct
                .map((tag, index) => {
                  const foundTag = tagsProduct.find(
                    (item) => item.value === tag
                  );
                  return foundTag ? { ...foundTag, key: index } : null;
                })
                .filter(Boolean)}
              onChange={(event, newValue) => {
                const values = newValue.map((item) => item.value);
                handleInputChange("tagsProduct", values);
              }}
              renderInput={(params) => <TextField {...params} label="Tags" />}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Checkbox checked={selected} style={{ marginRight: 8 }} />
                    {option.label}
                  </li>
                );
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}
