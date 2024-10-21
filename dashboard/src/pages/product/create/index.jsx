import { useEffect, useState } from "react";
import { Button, Tabs, Tab, Card, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import TabPanel, { a11yProps } from "../tags";
import Information from "./information";
import SEOInformation from "./SEOInformation";
import AttributesSection from "./AttributesSection";
import { Grid } from "@mui/material";
import PriceProduct from "./price";
import ImagesProduct from "./image/images";
import VideoProduct from "./image/video";
import ThumbnailProduct from "./image/thumbnail";
import OtherProduct from "./other";
import Specifications from "./specifications";
import Gifts from "./gifts";
import { useDispatch, useSelector } from "react-redux";
import { getAttribute } from "../../../redux/slices/attribute";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const [mainTabValue, setMainTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [subTabValue2, setSubTabValue2] = useState(0);

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
    onStock: "", // hàng có thể bán
    inStock: "", // hàng tồn kho
    inComing: "", // hàng đang về
    unit: "",
    minInventory: "",
    maxInventory: "",
    weight: "",
    isBattery: false,
    isStopSelling: false,
    description: "",
    shortDescription: "",
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
    warehouse: "",
    tagsProduct: [],
    attributes: [],
    specifications: [],
    gifts: [],
  });

  const [attributeData, setAttributeData] = useState({
    aid: "",
    value: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    price: "",
    discount: "",
    onStock: "", // hàng có thể bán
    inStock: "", // hàng tồn kho
    inComing: "", // hàng đang về
    unit: "",
    minInventory: "",
    maxInventory: "",
    images: [],
  });

  useEffect(() => {
    if (statusGetAttribute === "success") {
      const attributes = dataAttribute.map((item) => ({
        id: item._id,
        name: item.name,
        values: item.values.map((value) => ({
          name: value,
          value: value, // Thêm giá trị để sử dụng trong Select
        })),
      }));
      setAttributesSelect(attributes);
    }
  }, [dataAttribute, statusGetAttribute]); // Loại bỏ `attributesSelect` khỏi danh sách phụ thuộc

  const handleInputChange = (field, value) =>
    setProductData({ ...productData, [field]: value });

  const handleAttributeChange = (field, value) =>
    setAttributeData({ ...attributeData, [field]: value });

  const handleUploadThumbnail = (url) =>
    setProductData({ ...productData, thumbnail: url });

  const handleUploadImages = (url) =>
    setProductData({ ...productData, images: [...productData.images, url] });

  const handleUploadVideo = (url) =>
    setProductData({ ...productData, videos: url });

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

  const handleDeleteAttribute = (index) => {
    setProductData({
      ...productData,
      attributes: productData.attributes.filter((_, i) => i !== index),
    });
  };

  const handleEditAttribute = (index) => {
    const attribute = productData.attributes[index];
    setAttributeData({
      aid: attribute.aid,
      value: attribute.value,
      SKU: attribute.SKU,
      historicalPrice: attribute.historicalPrice,
      priceInMarket: attribute.priceInMarket,
      price: attribute.price,
      discount: attribute.discount,
      onStock: attribute.onStock,
      inStock: attribute.inStock,
      inComing: attribute.inComing,
      unit: attribute.unit,
      minInventory: attribute.minInventory,
      maxInventory: attribute.maxInventory,
      images: attribute.images,
    });
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

  const tagsProduct = [
    { value: "1", label: "Tag 1" },
    { value: "2", label: "Tag 2" },
    { value: "3", label: "Tag 3" },
  ];

  return (
    <>
      <Card>
        <Tabs value={mainTabValue} onChange={handleMainTabChange} centered>
          <Tab label="Thông tin sản phẩm" {...a11yProps(0)} />
          <Tab label="Thông tin SEO" {...a11yProps(1)} />
          <Tab label="Biến thể" {...a11yProps(2)} />
        </Tabs>

        <TabPanel value={mainTabValue} index={0}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin sản phẩm</Typography>
              <Information
                productData={productData}
                handleInputChange={handleInputChange}
                seriesSelect={seriesSelect}
                categorySelect={categorySelect}
                brandSelect={brandSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Giá và hình ảnh</Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tabs
                    value={subTabValue}
                    onChange={handleSubTabChange}
                    orientation="vertical"
                    aria-label="Tabs phụ dọc"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    <Tab label="Giá" {...a11yProps(0)} />
                    <Tab label="Hình và video" {...a11yProps(1)} />
                    <Tab label="Thông số" {...a11yProps(2)} />
                    <Tab label="Khác" {...a11yProps(3)} />
                  </Tabs>
                </Grid>

                <Grid item xs={10}>
                  <TabPanel value={subTabValue} index={0}>
                    <PriceProduct
                      productData={productData}
                      handleInputChange={handleInputChange}
                    />
                  </TabPanel>
                  <TabPanel value={subTabValue} index={1}>
                    <Tabs
                      value={subTabValue2}
                      onChange={handleSubTabChange2}
                      orientation="horizontal"
                      aria-label="Tabs phụ dọc"
                      centered
                    >
                      <Tab label="hình" {...a11yProps(0)} />
                      <Tab label="video" {...a11yProps(1)} />
                      <Tab label="Khác" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={subTabValue2} index={0}>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                          <ThumbnailProduct
                            handleUploadThumbnail={handleUploadThumbnail}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h6"
                            sx={{
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            Hình ảnh
                          </Typography>
                          {/* Component xử lý hình ảnh */}
                          <ImagesProduct
                            handleUploadImages={handleUploadImages}
                            onDelete={(index) => {
                              const newImages = [...productData.images];
                              newImages.splice(index, 1);
                              setProductData({
                                ...productData,
                                images: newImages,
                              });
                            }}
                          />
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={subTabValue2} index={1}>
                      <Grid sx={{ mt: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          Video
                        </Typography>
                        <VideoProduct
                          handleUploadVideo={handleUploadVideo}
                          onDelete={(index) => {
                            const newVideos = [...productData.videos];
                            newVideos.splice(index, 1);
                            setProductData({
                              ...productData,
                              videos: newVideos,
                            });
                          }}
                        />
                      </Grid>
                    </TabPanel>
                    <TabPanel value={subTabValue2} index={2}>
                      <OtherProduct
                        productData={productData}
                        handleInputChange={handleInputChange}
                        categorySelect={categorySelect}
                        brandSelect={brandSelect}
                        seriesSelect={seriesSelect}
                        tagsProduct={tagsProduct}
                      />
                    </TabPanel>
                  </TabPanel>
                  <TabPanel value={subTabValue} index={2}>
                    <Specifications
                      productData={productData}
                      handleInputChange={handleInputChange}
                    />
                  </TabPanel>
                  <TabPanel value={subTabValue} index={3}>
                    <Gifts
                      productData={productData}
                      handleInputChange={handleInputChange}
                    />
                  </TabPanel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={mainTabValue} index={1}>
          <Typography variant="h6">Thông tin Seo</Typography>

          <SEOInformation
            productData={productData}
            handleInputChange={handleInputChange}
          />
        </TabPanel>

        <TabPanel value={mainTabValue} index={2}>
          <AttributesSection
            attributeData={attributeData}
            productData={productData}
            handleAttributeChange={handleAttributeChange}
            handleAddAttribute={handleAddAttribute}
            handleDeleteAttribute={handleDeleteAttribute}
            handleEditAttribute={handleEditAttribute}
            attributesSelect={attributesSelect}
          />
        </TabPanel>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProduct}
            sx={{ mr: 2 }}
          >
            Lưu sản phẩm
          </Button>
          <Button variant="contained" color="error">
            Hủy
          </Button>
        </Box>
      </Card>
    </>
  );
}
