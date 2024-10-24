/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Tabs, Tab, Card, Typography, Box } from "@mui/material";
import TabPanel, { a11yProps } from "../tags";
import Information from "./information";
import SEOInformation from "./SEOInformation";
import AttributesSection from "./attributes/AttributesSection";
import { Grid } from "@mui/material";
import ImagesProduct from "./image/images";
import VideoProduct from "./image/video";
import ThumbnailProduct from "./image/thumbnail";
import OtherProduct from "./other";
import Specifications from "./specifications";
import Gifts from "./gifts";
import { useDispatch, useSelector } from "react-redux";
import { getAttribute } from "../../../redux/slices/attribute";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { getAllCollections } from "../../../redux/slices/collection";
import { getAllTags as getTags } from "../../../redux/slices/tags";
import { getAllWarehouses } from "../../../redux/slices/warehouse";
import { createProduct } from "../../../redux/slices/product";
import { handleToast } from "./../../../utils/toast";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const [mainTabValue, setMainTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [subTabValue2, setSubTabValue2] = useState(0);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [seriesSelect, setSeriesSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [warehouseSelect, setWarehouseSelect] = useState([]);

  const handleMainTabChange = (event, newValue) => setMainTabValue(newValue);
  const handleSubTabChange = (event, newValue) => setSubTabValue(newValue);
  const handleSubTabChange2 = (event, newValue) => setSubTabValue2(newValue);

  const [attributesSelect, setAttributesSelect] = useState([]);
  const statusGetAttribute = useSelector((state) => state.attribute.status);
  const dataAttribute = useSelector((state) => state.attribute.data);
  useEffect(() => {
    dispatch(getAttribute());
  }, [dispatch]);

  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    price: "",
    discount: "",
    onStock: "",
    inStock: "",
    inComing: "",
    unit: "",
    minInventory: "",
    maxInventory: "",
    weight: "",
    isBattery: false,
    isStopSelling: false,
    description: "",
    keywords: "",
    titleSEO: "",
    descriptionSEO: "",
    thumbnail: "",
    images: [],
    videos: "",
    status: "available",
    series: "",
    brand: "",
    category: "",
  });

  const dataVariants = {
    type: ["size", "color", "weight"],
    value: {
      size: ["S", "M", "L", "XL"],
      color: ["Red", "Blue", "Green", "Black", "White"],
      weight: ["1kg", "2kg", "3kg"],
    },
  };

  const dataSpecifications = {
    NameTT: ["Màu sắc", "Kích thước", "Trọng lượng"],
    ValueTT: {
      "Màu sắc": ["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"],
      "Kích thước": ["S", "M", "L", "XL"],
      "Trọng lượng": ["1kg", "2kg", "3kg"],
    },
    TypeTT: ["text", "array", "number"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSaveProduct = () => {
    console.log("Dữ liệu sản phẩm:", productData);
    // Gửi dữ liệu sản phẩm lên API hoặc xử lý lưu trữ tại đây
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Tạo Sản Phẩm Mới
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            value={productData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Slug"
            fullWidth
            value={productData.slug}
            onChange={(e) => handleInputChange("slug", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="SKU"
            fullWidth
            value={productData.SKU}
            onChange={(e) => handleInputChange("SKU", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Giá thị trường"
            fullWidth
            type="number"
            value={productData.priceInMarket}
            onChange={(e) => handleInputChange("priceInMarket", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Giá cửa hàng"
            fullWidth
            type="number"
            value={productData.priceInStore}
            onChange={(e) => handleInputChange("priceInStore", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Giá online"
            fullWidth
            type="number"
            value={productData.priceOnline}
            onChange={(e) => handleInputChange("priceOnline", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Giảm giá"
            fullWidth
            type="number"
            value={productData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tồn kho"
            fullWidth
            type="number"
            value={productData.onStock}
            onChange={(e) => handleInputChange("onStock", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Đơn vị"
            fullWidth
            value={productData.unit}
            onChange={(e) => handleInputChange("unit", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Khối lượng"
            fullWidth
            type="number"
            value={productData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
          />
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
                checked={productData.isMain}
                onChange={(e) => handleInputChange("isMain", e.target.checked)}
              />
            }
            label="Sản phẩm chính"
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
        <Grid item xs={12}>
          <TextField
            label="Mô tả sản phẩm"
            fullWidth
            multiline
            rows={4}
            value={productData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Từ khóa"
            fullWidth
            value={productData.keywords}
            onChange={(e) => handleInputChange("keywords", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tiêu đề SEO"
            fullWidth
            value={productData.titleSEO}
            onChange={(e) => handleInputChange("titleSEO", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mô tả SEO"
            fullWidth
            multiline
            rows={3}
            value={productData.descriptionSEO}
            onChange={(e) =>
              handleInputChange("descriptionSEO", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Ảnh đại diện"
            fullWidth
            value={productData.thumbnail}
            onChange={(e) => handleInputChange("thumbnail", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            placeholder="Danh sách ảnh (URL), ngăn cách bởi dấu phẩy"
            minRows={3}
            style={{ width: "100%" }}
            value={productData.images.join(", ")}
            onChange={(e) =>
              handleInputChange("images", e.target.value.split(", "))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Video (URL)"
            fullWidth
            value={productData.videos}
            onChange={(e) => handleInputChange("videos", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            value={productData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <MenuItem value="available">Còn hàng</MenuItem>
            <MenuItem value="unavailable">Hết hàng</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Series ID"
            fullWidth
            value={productData.series}
            onChange={(e) => handleInputChange("series", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Brand ID"
            fullWidth
            value={productData.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Category ID"
            fullWidth
            value={productData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProduct}
        style={{ marginTop: "20px" }}
      >
        Tạo sản phẩm
      </Button>
    </>
  );
}
