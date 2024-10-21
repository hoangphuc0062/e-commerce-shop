/* eslint-disable react/prop-types */
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Textarea from "../../../components/textarea";
import slugify from "../../../utils/slugify";
import { useEffect, useState } from "react";
import PriceProduct from "./price";

export default function Information({
  productData,
  handleInputChange,
  warehouseSelect,
}) {
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  useEffect(() => {
    // Chỉ tự động cập nhật slug nếu người dùng chưa chỉnh sửa slug
    if (productData.name && !isSlugEdited) {
      const generatedSlug = slugify(productData.name);
      handleInputChange("slug", generatedSlug);
    }
  }, [productData.name, isSlugEdited, handleInputChange]);

  const handleInputChangeSlug = (key, value) => {
    if (key === "slug") {
      setIsSlugEdited(true);
    }
    handleInputChange(key, value);
  };

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
              value={productData.name}
              onChange={(e) => {
                setIsSlugEdited(false);
                handleInputChangeSlug("name", e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Slug"
              fullWidth
              value={productData.slug}
              onChange={(e) => handleInputChangeSlug("slug", e.target.value)}
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
          <Grid item xs={6}>
            <TextField
              label="Trọng lượng"
              fullWidth
              value={productData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={4}>
            <TextField
              label="Số lượng có thể bán"
              fullWidth
              value={productData.onStock}
              onChange={(e) => handleInputChange("onStock", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tồn kho"
              fullWidth
              value={productData.inStock}
              onChange={(e) => handleInputChange("inStock", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng nhập kho"
              fullWidth
              value={productData.inComing}
              onChange={(e) => handleInputChange("inComing", e.target.value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Số lượng tối thiểu"
              fullWidth
              value={productData.minInventory}
              onChange={(e) =>
                handleInputChange("minInventory", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tối đa"
              fullWidth
              value={productData.maxInventory}
              onChange={(e) =>
                handleInputChange("maxInventory", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="warehouse-label">Kho</InputLabel>
              <Select
                labelId="warehouse-label"
                label="Kho"
                value={productData.warehouse}
                onChange={(e) => handleInputChange("warehouse", e.target.value)}
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
                  checked={productData.isBattery}
                  onChange={(e) =>
                    handleInputChange("isBattery", e.target.checked)
                  }
                />
              }
              label="Có pin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={productData.isStopSelling}
                  onChange={(e) =>
                    handleInputChange("isStopSelling", e.target.checked)
                  }
                />
              }
              label="Ngừng bán"
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ mb: 2 }} variant="h6">
              Thông tin giá
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PriceProduct
              productData={productData}
              handleInputChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">thông tin mô tả</Typography>
          </Grid>
          <Grid item xs={6}>
            <Textarea
              label="Mô tả ngắn"
              name="shortDescription"
              value={productData.shortDescription || ""}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Textarea
              name="description"
              label="Mô tả sản phẩm"
              value={productData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
