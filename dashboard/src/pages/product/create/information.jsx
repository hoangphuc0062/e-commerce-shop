/* eslint-disable react/prop-types */
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
  isSubmitted,
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
              error={
                isSubmitted &&
                (!productData.name ||
                  productData.name.length < 3 ||
                  productData.name.length > 250 ||
                  /^\s|\s$/.test(productData.name))
              }
              helperText={
                isSubmitted &&
                (!productData.name
                  ? "Tên sản phẩm là bắt buộc"
                  : productData.name.length < 3
                    ? "Tên sản phẩm phải có ít nhất 3 ký tự"
                    : productData.name.length > 250
                      ? "Tên sản phẩm không được vượt quá 250 ký tự"
                      : /^\s|\s$/.test(productData.name)
                        ? "Tên sản phẩm không được chứa khoảng trắng ở đầu hoặc cuối"
                        : "")
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Slug"
              fullWidth
              value={productData.slug}
              onChange={(e) => handleInputChangeSlug("slug", e.target.value)}
              error={
                isSubmitted && (
                  !productData.slug ||
                  !/^[a-z0-9-]+$/.test(productData.slug) ||
                  productData.slug.length < 3 ||
                  productData.slug.length > 250
                )
              }
              helperText={
                isSubmitted && (
                  !productData.slug
                    ? "Slug là bắt buộc"
                    : productData.slug.length < 3
                      ? "Slug phải có ít nhất 3 ký tự"
                      : productData.slug.length > 250
                        ? "Slug không được vượt quá 250 ký tự"
                        : "Slug chỉ chứa chữ thường, số và dấu gạch ngang"
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="SKU"
              fullWidth
              value={productData.SKU}
              onChange={(e) => handleInputChange("SKU", e.target.value)}
              error={
                isSubmitted && (
                  !productData.SKU ||
                  productData.SKU.length < 3 ||
                  productData.SKU.length > 100
                )
              }
              helperText={
                isSubmitted && (
                  !productData.SKU
                    ? "SKU là bắt buộc"
                    : productData.SKU.length < 3
                      ? "SKU phải có ít nhất 3 ký tự"
                      : productData.SKU.length > 100
                        ? "SKU không được vượt quá 100 ký tự"
                        : ""
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Trọng lượng"
              fullWidth
              value={productData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              error={
                isSubmitted && (
                  !productData.weight ||
                  isNaN(productData.weight) || // Kiểm tra xem có phải là số hay không
                  Number(productData.weight) <= 0 // Kiểm tra giá trị phải lớn hơn 0
                )
              }
              helperText={
                isSubmitted && (
                  !productData.weight
                    ? "Trọng lượng là bắt buộc"
                    : isNaN(productData.weight)
                      ? "Trọng lượng phải là một số hợp lệ"
                      : Number(productData.weight) <= 0
                        ? "Trọng lượng phải lớn hơn 0"
                        : ""
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              {isSubmitted && !productData.unit && "Đơn vị là bắt buộc" ? (
                <InputLabel error id="unit">
                  Đơn vị
                </InputLabel>
              ) : (
                <InputLabel id="unit">Đơn vị</InputLabel>
              )}
              <Select
                labelId="unit"
                value={productData.unit}
                label="Đơn vị"
                onChange={(e) => handleInputChange("unit", e.target.value)}
                error={isSubmitted && !productData.unit}
              >
                <MenuItem value="kg">Kilogram (kg)</MenuItem>
                <MenuItem value="g">Gram (g)</MenuItem>
                <MenuItem value="mg">Miligram (mg)</MenuItem>
                <MenuItem value="l">Lít (l)</MenuItem>
                <MenuItem value="ml">Mililit (ml)</MenuItem>
              </Select>
              <FormHelperText error={isSubmitted && !productData.unit}>
                {isSubmitted && !productData.unit && "Đơn vị là bắt buộc"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng có thể bán"
              fullWidth
              value={productData.onStock}
              onChange={(e) => handleInputChange("onStock", e.target.value)}
              error={
                isSubmitted && (
                  !productData.onStock ||
                  isNaN(productData.onStock) || // Kiểm tra xem có phải là số hay không
                  Number(productData.onStock) <= 0 || // Số lượng không được âm
                  Number(productData.onStock) > 500000 // Giới hạn tối đa 
                )
              }
              helperText={
                isSubmitted && (
                  !productData.onStock
                    ? "Số lượng là bắt buộc"
                    : isNaN(productData.onStock)
                      ? "Số lượng phải là một số hợp lệ"
                      : Number(productData.onStock) <= 0
                        ? "Số lượng không được âm"
                        : Number(productData.onStock) > 500000
                          ? "Số lượng không được vượt quá  500000" // Giới hạn tối đa 
                          : ""
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng tồn kho"
              fullWidth
              value={productData.inStock}
              onChange={(e) => handleInputChange("inStock", e.target.value)}
              error={
                isSubmitted && (
                  !productData.inStock || // Kiểm tra trường không để trống
                  isNaN(productData.inStock) || // Kiểm tra xem có phải là số hay không
                  Number(productData.inStock) <= 0 || // Kiểm tra số lượng không âm
                  Number(productData.inStock) > 10000 // Giới hạn tối đa 
                )
              }
              helperText={
                isSubmitted && (
                  !productData.inStock
                    ? "Số lượng là bắt buộc"
                    : isNaN(productData.inStock)
                      ? "Số lượng phải là một số hợp lệ"
                      : Number(productData.inStock) <= 0
                        ? "Số lượng phải lớn hơn 0"
                        : Number(productData.inStock) > 10000
                          ? "Số lượng không được vượt quá 10000"
                          : ""
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số lượng nhập kho"
              fullWidth
              value={productData.inComing}
              onChange={(e) => handleInputChange("inComing", e.target.value)}
              error={
                isSubmitted && (
                  !productData.inComing || // Kiểm tra trường không để trống
                  isNaN(productData.inComing) || // Kiểm tra xem có phải là số hay không
                  Number(productData.inComing) <= 0 || // Kiểm tra số lượng không âm và không bằng 0
                  Number(productData.inComing) > 100000 // Giới hạn tối đa (ví dụ 100)
                )
              }
              helperText={
                isSubmitted && (
                  !productData.inComing
                    ? "Số lượng là bắt buộc"
                    : isNaN(productData.inComing)
                      ? "Số lượng phải là một số hợp lệ"
                      : Number(productData.inComing) <= 0
                        ? "Số lượng phải lớn hơn 0"
                        : Number(productData.inComing) > 100000
                          ? "Số lượng không được vượt quá 100000"
                          : ""
                )
              }
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
              error={
                isSubmitted && (
                  !productData.minInventory || // Kiểm tra trường không để trống
                  isNaN(productData.minInventory) || // Kiểm tra xem có phải là số hay không
                  Number(productData.minInventory) <= 0 || // Kiểm tra số lượng phải lớn hơn 0
                  Number(productData.minInventory) > 10000
                )
              }
              helperText={
                isSubmitted && (
                  !productData.minInventory
                    ? "Số lượng là bắt buộc"
                    : isNaN(productData.minInventory)
                      ? "Số lượng phải là một số hợp lệ"
                      : Number(productData.minInventory) <= 0
                        ? "Số lượng phải lớn hơn 0"
                        : Number(productData.minInventory) > 10000
                          ? "Số lượng không được vượt quá 100"
                          : ""
                )
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
              error={
                isSubmitted && (
                  !productData.maxInventory || // Kiểm tra trường không để trống
                  isNaN(productData.maxInventory) || // Kiểm tra xem có phải là số hay không
                  Number(productData.maxInventory) <= 0 || // Kiểm tra số lượng phải lớn hơn 0
                  (productData.minInventory &&
                    Number(productData.maxInventory) < Number(productData.minInventory)) || // Kiểm tra maxInventory >= minInventory
                  Number(productData.maxInventory) > 100000 // Giới hạn tối đa (ví dụ 1000)
                )
              }
              helperText={
                isSubmitted && (
                  !productData.maxInventory
                    ? "Số lượng là bắt buộc"
                    : isNaN(productData.maxInventory)
                      ? "Số lượng phải là một số hợp lệ"
                      : Number(productData.maxInventory) <= 0
                        ? "Số lượng phải lớn hơn 0"
                        : productData.minInventory &&
                          Number(productData.maxInventory) < Number(productData.minInventory)
                          ? "Số lượng tối đa phải lớn hơn hoặc bằng số lượng tối thiểu"
                          : Number(productData.maxInventory) > 100000
                            ? "Số lượng không được vượt quá 100000"
                            : ""
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              {isSubmitted && !productData.warehouse && "Kho là bắt buộc" ? (
                <InputLabel error id="warehouse-label">
                  Kho
                </InputLabel>
              ) : (
                <InputLabel id="warehouse-label">Kho</InputLabel>
              )}
              <Select
                labelId="warehouse-label"
                label="Kho"
                value={productData.warehouse}
                onChange={(e) => handleInputChange("warehouse", e.target.value)}
                error={isSubmitted && !productData.warehouse}
              >
                {warehouseSelect.map((warehouse) => (
                  <MenuItem key={warehouse.value} value={warehouse.value}>
                    {warehouse.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={isSubmitted && !productData.warehouse}>
                {isSubmitted && !productData.warehouse && "Kho không được để trống"}
              </FormHelperText>
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
              isSubmitted={isSubmitted}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: 2, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Thông tin mô tả</Typography>
          </Grid>
          <Grid item xs={6}>
            <Textarea
              label="Mô tả ngắn"
              name="shortDescription"
              value={productData.shortDescription || ""}
              onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              error={
                isSubmitted &&
                (!productData.shortDescription ||
                  productData.shortDescription.length < 20 ||
                  productData.shortDescription.length > 200)
              }
              helperText={
                isSubmitted && (
                  !productData.shortDescription
                    ? "Mô tả ngắn là bắt buộc"
                    : productData.shortDescription.length < 20
                      ? "Mô tả ngắn phải có ít nhất 20 ký tự"
                      : productData.shortDescription.length > 200
                        ? "Mô tả ngắn không được vượt quá 200 ký tự"
                        : ""
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Textarea
              label="Mô tả sản phẩm"
              name="description"
              value={productData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={
                isSubmitted &&
                (!productData.description ||
                  productData.description.length < 50 ||
                  productData.description.length > 1000)
              }
              helperText={
                isSubmitted && (
                  !productData.description
                    ? "Mô tả sản phẩm là bắt buộc"
                    : productData.description.length < 50
                      ? "Mô tả sản phẩm phải có ít nhất 50 ký tự"
                      : productData.description.length > 1000
                        ? "Mô tả sản phẩm không được vượt quá 1000 ký tự"
                        : ""
                )
              }
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
