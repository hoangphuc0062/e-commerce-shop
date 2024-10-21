import { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Typography,
  Box,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import Textarea from "../components/textarea";

// Hàm hỗ trợ TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Hàm tạo các thuộc tính cho Tab
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateProductTest() {
  const [mainTabValue, setMainTabValue] = useState(0); // Tabs chính
  const [subTabValue, setSubTabValue] = useState(0); // Tabs phụ

  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    priceInStore: "",
    priceOnline: "",
    discount: "",
    onStock: "",
    unit: "",
    minInventory: "",
    maxInventory: "",
    weight: "",
    isBattery: false,
    isMain: true,
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
    attributes: [], // Danh sách các thuộc tính
  });

  const [attributeData, setAttributeData] = useState({
    aid: "",
    value: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    priceInStore: "",
    priceOnline: "",
    discount: "",
    onStock: "",
    unit: "",
    minInventory: "",
    maxInventory: "",
    avatar: "",
    images: [],
  });

  // Thay đổi giá trị các Tabs chính
  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };

  // Thay đổi giá trị các Tabs phụ
  const handleSubTabChange = (event, newValue) => {
    setSubTabValue(newValue);
  };

  // Xử lý thay đổi input của sản phẩm
  const handleInputChange = (field, value) => {
    setProductData({ ...productData, [field]: value });
  };

  // Xử lý thay đổi input của thuộc tính
  const handleAttributeChange = (field, value) => {
    setAttributeData({ ...attributeData, [field]: value });
  };

  // Thêm thuộc tính
  const handleAddAttribute = () => {
    setProductData({
      ...productData,
      attributes: [...productData.attributes, attributeData],
    });
    setAttributeData({
      aid: "",
      value: "",
      SKU: "",
      historicalPrice: "",
      priceInMarket: "",
      priceInStore: "",
      priceOnline: "",
      discount: "",
      onStock: "",
      unit: "",
      minInventory: "",
      maxInventory: "",
      avatar: "",
      images: [],
    });
  };

  // Lưu sản phẩm
  const handleSaveProduct = () => {
    console.log("Dữ liệu sản phẩm:", productData);
    // Gửi dữ liệu sản phẩm lên API hoặc xử lý lưu trữ tại đây
  };

  const categorySelect = [
    { value: "1", label: "Category 1" },
    { value: "2", label: "Category 2" },
    { value: "3", label: "Category 3" },
  ];

  const brandSelect = [
    { value: "1", label: "Brand 1" },
    { value: "2", label: "Brand 2" },
    { value: "3", label: "Brand 3" },
  ];

  const seriesSelect = [
    { value: "1", label: "Series 1" },
    { value: "2", label: "Series 2" },
    { value: "3", label: "Series 3" },
  ];

  return (
    <>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {/* Tabs chính */}
          <Tabs
            value={mainTabValue}
            onChange={handleMainTabChange}
            aria-label="tabs chính"
            centered
          >
            <Tab label="Thông tin sản phẩm" {...a11yProps(0)} />
            <Tab label="Thông tin SEO" {...a11yProps(1)} />
            <Tab label="Biến thể" {...a11yProps(2)} />
          </Tabs>

          <Card>
            {/* Nội dung của Tabs chính */}
            <TabPanel value={mainTabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  {/* Tabs phụ dạng dọc */}
                  <Tabs
                    orientation="vertical"
                    value={subTabValue}
                    onChange={handleSubTabChange}
                    aria-label="Tabs phụ dọc"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    <Tab label="Thông tin chung" {...a11yProps(0)} />
                    <Tab label="Giá" {...a11yProps(1)} />
                    <Tab label="Ảnh" {...a11yProps(2)} />
                    <Tab label="Thuộc tính" {...a11yProps(3)} />
                    <Tab label="Số lượng" {...a11yProps(4)} />
                    <Tab label="Mô tả" {...a11yProps(5)} />
                  </Tabs>
                </Grid>
                <Grid item xs={11}>
                  {/* Nội dung của Tabs phụ */}

                  {/* Thông tin chung */}
                  <TabPanel value={subTabValue} index={0}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Tên sản phẩm"
                          fullWidth
                          value={productData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Slug"
                          fullWidth
                          value={productData.slug}
                          onChange={(e) =>
                            handleInputChange("slug", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="SKU"
                          fullWidth
                          value={productData.SKU}
                          onChange={(e) =>
                            handleInputChange("SKU", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Số lượng tồn"
                          fullWidth
                          value={productData.onStock}
                          onChange={(e) =>
                            handleInputChange("onStock", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Trọng lượng"
                          fullWidth
                          value={productData.weight}
                          onChange={(e) =>
                            handleInputChange("weight", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="unit">Đơn vị</InputLabel>
                          <Select
                            labelId="unit"
                            value={productData.unit}
                            label="Đơn vị"
                            onChange={(e) =>
                              handleInputChange("unit", e.target.value)
                            }
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
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={productData.isMain}
                              onChange={(e) =>
                                handleInputChange("isMain", e.target.checked)
                              }
                            />
                          }
                          label="Sản phẩm chính"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={productData.isStopSelling}
                              onChange={(e) =>
                                handleInputChange(
                                  "isStopSelling",
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label="Ngừng bán"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  {/* Giá */}
                  <TabPanel value={subTabValue} index={1}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Giá gốc"
                          fullWidth
                          value={productData.historicalPrice}
                          onChange={(e) =>
                            handleInputChange("historicalPrice", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Giá thị trường"
                          fullWidth
                          value={productData.priceInMarket}
                          onChange={(e) =>
                            handleInputChange("priceInMarket", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Giá cửa hàng"
                          fullWidth
                          value={productData.priceInStore}
                          onChange={(e) =>
                            handleInputChange("priceInStore", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Giá online"
                          fullWidth
                          value={productData.priceOnline}
                          onChange={(e) =>
                            handleInputChange("priceOnline", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Giảm giá"
                          fullWidth
                          value={productData.discount}
                          onChange={(e) =>
                            handleInputChange("discount", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* Ảnh */}
                  <TabPanel value={subTabValue} index={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Ảnh đại diện"
                          fullWidth
                          value={productData.thumbnail}
                          onChange={(e) =>
                            handleInputChange("thumbnail", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Ảnh chi tiết"
                          fullWidth
                          value={productData.images}
                          onChange={(e) =>
                            handleInputChange("images", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Video"
                          fullWidth
                          value={productData.videos}
                          onChange={(e) =>
                            handleInputChange("videos", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* Thuộc tính */}
                  <TabPanel value={subTabValue} index={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel id="category">Danh mục</InputLabel>
                          <Select
                            labelId="category"
                            value={productData.category}
                            label="Danh mục"
                            onChange={(e) =>
                              handleInputChange("category", e.target.value)
                            }
                          >
                            {categorySelect.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel id="brand">Thương hiệu</InputLabel>
                          <Select
                            labelId="brand"
                            value={productData.brand}
                            label="Thương hiệu"
                            onChange={(e) =>
                              handleInputChange("brand", e.target.value)
                            }
                          >
                            {brandSelect.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel id="series">Dòng sản phẩm</InputLabel>
                          <Select
                            labelId="series"
                            value={productData.series}
                            label="Dòng sản phẩm"
                            onChange={(e) =>
                              handleInputChange("series", e.target.value)
                            }
                          >
                            {seriesSelect.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  {/* Số lượng */}
                  <TabPanel value={subTabValue} index={4}>
                    <Grid container spacing={2}>
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
                          <InputLabel id="status">Trạng thái</InputLabel>
                          <Select
                            labelId="status"
                            value={productData.status}
                            label="Trạng thái"
                            onChange={(e) =>
                              handleInputChange("status", e.target.value)
                            }
                          >
                            <MenuItem value="available">Còn hàng</MenuItem>
                            <MenuItem value="out_of_stock">Hết hàng</MenuItem>
                            <MenuItem value="coming_soon">Sắp về</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* mo ta*/}
                  <TabPanel value={subTabValue} index={5}>
                    <Textarea
                      label="Mô tả sản phẩm"
                      value={productData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </TabPanel>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={mainTabValue} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Từ khóa"
                    fullWidth
                    value={productData.keywords}
                    onChange={(e) =>
                      handleInputChange("keywords", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Tiêu đề SEO"
                    fullWidth
                    value={productData.titleSEO}
                    onChange={(e) =>
                      handleInputChange("titleSEO", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả SEO"
                    name="descriptionSEO"
                    value={productData.descriptionSEO}
                    onChange={(e) =>
                      handleInputChange("descriptionSEO", e.target.value)
                    }
                    height={500}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={mainTabValue} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="AID (ID thuộc tính)"
                    fullWidth
                    value={attributeData.aid}
                    onChange={(e) =>
                      handleAttributeChange("aid", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Giá trị thuộc tính"
                    fullWidth
                    value={attributeData.value}
                    onChange={(e) =>
                      handleAttributeChange("value", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="SKU"
                    fullWidth
                    value={attributeData.SKU}
                    onChange={(e) =>
                      handleAttributeChange("SKU", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Giá thị trường (thuộc tính)"
                    fullWidth
                    type="number"
                    value={attributeData.priceInMarket}
                    onChange={(e) =>
                      handleAttributeChange("priceInMarket", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Giảm giá (thuộc tính)"
                    fullWidth
                    type="number"
                    value={attributeData.discount}
                    onChange={(e) =>
                      handleAttributeChange("discount", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Tồn kho (thuộc tính)"
                    fullWidth
                    type="number"
                    value={attributeData.onStock}
                    onChange={(e) =>
                      handleAttributeChange("onStock", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Avatar (URL)"
                    fullWidth
                    value={attributeData.avatar}
                    onChange={(e) =>
                      handleAttributeChange("avatar", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextareaAutosize
                    placeholder="Danh sách ảnh (URL), ngăn cách bởi dấu phẩy"
                    minRows={2}
                    style={{ width: "100%" }}
                    value={attributeData.images.join(", ")}
                    onChange={(e) =>
                      handleAttributeChange(
                        "images",
                        e.target.value.split(", ")
                      )
                    }
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAttribute}
                style={{ marginTop: "20px" }}
              >
                Thêm thuộc tính
              </Button>

              {/* Danh sách thuộc tính đã thêm */}
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Thuộc tính đã thêm:
              </Typography>
              {productData.attributes.length > 0 ? (
                <ul>
                  {productData.attributes.map((attr, index) => (
                    <li key={index}>
                      <strong>ID thuộc tính:</strong> {attr.aid},{" "}
                      <strong>Giá trị:</strong> {attr.value},{" "}
                      <strong>SKU:</strong> {attr.SKU}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>Chưa có thuộc tính nào được thêm.</Typography>
              )}
            </TabPanel>
          </Card>

          {/* Nút lưu sản phẩm */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProduct}
            style={{ marginTop: "20px" }}
          >
            Tạo sản phẩm
          </Button>
        </Box>
      </Card>
    </>
  );
}
