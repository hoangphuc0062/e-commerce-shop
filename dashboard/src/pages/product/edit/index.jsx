import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../redux/slices/product";
import { getAllWarehouses } from "../../../redux/slices/warehouse";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";

import { getAllTags } from "../../../redux/slices/tags";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import CustomDropdown from "../../../components/Dropdown";
import ImageUploader from "../../../components/upload";
import Textarea from "../../../components/textarea";
import slugify from "../../../utils/slugify";
import Attributes from "./Attributes";
import Variants from "./variants";
import { handleToast } from "../../../utils/toast";

export default function ProductEdit() {
  const { id } = useParams();

  const [dataProduct, setDataProduct] = useState([]);
  const [warehouseSelect, setWarehouseSelect] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);

  const [tagsSelect, setTagsSelect] = useState([]);
  const [isVariant, setIsVariant] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [isSEO, setIsSEO] = useState(false);

  const statusGetById = useSelector((state) => state.product.statusGetById);
  const productData = useSelector((state) => state.product.data?.products);
  const statusWarehouse = useSelector((state) => state.warehouse.status);
  const dataWarehouse = useSelector((state) => state.warehouse.data.wareHouses);
  const statusGetCategory = useSelector((state) => state.category.status);
  const dataCategory = useSelector((state) => state.category.data.categories);
  const statusBrand = useSelector((state) => state.brand.status);
  const dataBrand = useSelector((state) => state.brand.data);
  const statusTag = useSelector((state) => state.tag.status);
  const dataTag = useSelector((state) => state.tag.data.tags);
  const dispatch = useDispatch();
  const reverseTransformValues = (data) => {
    return {
      ...data[0],
      attributes: Object.entries(data[0].attributes).map(
        ([title, details]) => ({
          title,
          details: details.split(", ").map((detail) => {
            const [key, value] = detail.split(": ");
            return { key, value };
          }),
        })
      ),
    };
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (statusGetById === "success" && productData) {
      setDataProduct(productData);
    }
  }, [statusGetById, productData]);

  useEffect(() => {
    if (statusWarehouse === "success") {
      const warehouses = dataWarehouse.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setWarehouseSelect(warehouses);
    }
  }, [statusWarehouse, dataWarehouse]);
  useEffect(() => {
    if (statusGetCategory === "success") {
      const categories = dataCategory.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategorySelect(categories);
    }
  }, [statusGetCategory, dataCategory]);
  useEffect(() => {
    if (statusBrand === "success") {
      const brands = dataBrand.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setBrandSelect(brands);
    }
  }, [statusBrand, dataBrand]);

  useEffect(() => {
    if (statusTag === "succeeded") {
      const tags = dataTag.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setTagsSelect(tags);
    }
  }, [statusTag, dataTag]);
  useEffect(() => {
    if (statusGetById === "success" && productData) {
      const data = reverseTransformValues(productData);
      setDataProduct(data);
    }
  }, [statusGetById, productData]);

  const initialValues = {
    name: dataProduct.name || "",
    slug: dataProduct.slug || "",
    SKU: dataProduct.SKU || "",
    historicalPrice: dataProduct.historicalPrice || "",
    priceInMarket: dataProduct.priceInMarket || "",
    price: dataProduct.price || "",
    discount: dataProduct.discount || "",
    inventory: dataProduct.inventory || "",
    onStock: dataProduct.onStock || "",
    inComing: dataProduct.inComing || "",
    minInventory: dataProduct.minInventory || "",
    maxInventory: dataProduct.maxInventory || "",
    isBattery: dataProduct.isBattery || false,
    isStopSelling: dataProduct.isStopSelling || false,
    status: dataProduct.status || "",
    description: dataProduct.description || "",
    shortDescription: dataProduct.shortDescription || "",
    keywords: dataProduct.keywords || "",
    titleSEO: dataProduct.titleSEO || "",
    descriptionSEO: dataProduct.descriptionSEO || "",
    thumbnail: dataProduct.thumbnail || "",
    images: dataProduct.images || [],
    videos: dataProduct.videos || "",
    views: dataProduct.views || "",
    category: dataProduct.category || "",
    brand: dataProduct.brand || "",
    warehouse: dataProduct.warehouse || "",
    tagsProduct: dataProduct.tagsProduct || [],
    attributes:
      dataProduct.attributes?.map((item) => ({
        title: item.title,
        details: item.details.map((detail) => {
          return { key: detail.key, value: detail.value };
        }),
      })) || [],
    variants:
      dataProduct.variants?.map((item) => ({
        key: item.key,
        value: item.value,
        SKU: item.SKU,
        price: item.price,
        priceInMarket: item.priceInMarket,
        historicalPrice: item.historicalPrice,
        discount: item.discount,
        inventory: item.inventory,
        minInventory: item.minInventory,
        maxInventory: item.maxInventory,
        onStock: item.onStock,
        inComing: item.inComing,
        thumbnail: item.thumbnail,
      })) || [],
  };
  const validationSchema = Yup.object({
    // name: Yup.string().required("Tên sản phẩm không được để trống"),
    // slug: Yup.string().required("Slug không được để trống"),
    // SKU: Yup.string().required("SKU không được để trống"),
    // price: Yup.number().required("Giá bán không được để trống"),
    // historicalPrice: Yup.number().required("Giá gốc không được để trống"),
    // priceInMarket: Yup.number().required("Giá thị trường không được để trống"),
    // category: Yup.string().required("Danh mục không được để trống"),
    // brand: Yup.string().required("Thương hiệu không được để trống"),
    // series: Yup.string().required("Dòng sản phẩm không được để trống"),
    // tagsProduct: Yup.array().required("Tags không được để trống"),
    // warehouse: Yup.string().required("Kho hàng không được để trống"),
    // inventory: Yup.number().required("Tồn kho không được để trống"),
  });

  const transformValues = (values) => {
    return {
      ...values,
      attributes: values.attributes.reduce((acc, attr) => {
        if (attr.title && attr.details.length > 0) {
          acc[attr.title] = attr.details
            .filter((detail) => detail.key && detail.value)
            .map((detail) => `${detail.key}: ${detail.value}`)
            .join(", ");
        }
        return acc;
      }, {}),
    };
  };
  const handleSubmit = (values, { resetForm }) => {
    const data = transformValues(values);
    console.log("Dữ liệu gửi lên:", data);

    dispatch(updateProduct({ productId: id, data: { data } })).then(
      (unwrapResult) => {
        console.log("Dữ liệu", unwrapResult);
        if (unwrapResult.type === "product/updateProduct/fulfilled") {
          handleToast("success", "Sửa sản phẩm thành công");
          resetForm();
        } else {
          handleToast("error", "Sửa sản phẩm thất bại");
        }
      }
    );
  };

  const handleNameChange = (e, setFieldValue) => {
    const nameValue = e.target.value;
    const slugified = slugify(nameValue);

    setFieldValue("name", nameValue);
    setFieldValue("slug", slugified);
  };

  const [openRows, setOpenRows] = useState([]);
  const [variantopenRows, setVariantopenRows] = useState([]);
  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleVariantRow = (index) => {
    setVariantopenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box>
      {/* Toggle Product Type */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant={!isVariant ? "contained" : "outlined"}
          color="primary"
          onClick={() => setIsVariant(false)}
          sx={{ mr: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Sản phẩm đơn
        </Button>
        <Button
          variant={isVariant ? "contained" : "outlined"}
          color="primary"
          onClick={() => setIsVariant(true)}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Sản phẩm có biến thể
        </Button>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "background.default",
                p: 4,
                mx: "auto",
                borderRadius: 2,
                boxShadow: 1,
                mb: 6,
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6">Thông tin sản phẩm</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={values.name}
                  onChange={(e) => handleNameChange(e, setFieldValue)}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Slug"
                  name="slug"
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.slug && Boolean(errors.slug)}
                  helperText={touched.slug && errors.slug}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="SKU"
                  name="SKU"
                  value={values.SKU}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.SKU && Boolean(errors.SKU)}
                  helperText={touched.SKU && errors.SKU}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Giá bán"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Giá gốc"
                  name="historicalPrice"
                  value={values.historicalPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.historicalPrice && Boolean(errors.historicalPrice)
                  }
                  helperText={touched.historicalPrice && errors.historicalPrice}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Giá thị trường"
                  name="priceInMarket"
                  value={values.priceInMarket}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.priceInMarket && Boolean(errors.priceInMarket)}
                  helperText={touched.priceInMarket && errors.priceInMarket}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="isBattery" style={{ marginRight: "8px" }}>
                  Có pin
                </label>
                <Checkbox
                  id="isBattery"
                  checked={values.isBattery}
                  onChange={handleChange}
                  name="isBattery"
                />

                <label htmlFor="isStopSelling" style={{ marginRight: "8px" }}>
                  Ngừng bán
                </label>
                <Checkbox
                  id="isStopSelling"
                  checked={values.isStopSelling}
                  onChange={handleChange}
                  name="isStopSelling"
                />
                <CustomDropdown
                  label="Trạng thái"
                  name="status"
                  value={values.status || ""}
                  onChange={handleChange}
                  options={[
                    { value: "active", label: "Kích hoạt" },
                    { value: "inactive", label: "Ngưng kích hoạt" },
                    { value: "draft", label: "Bản nháp" },
                    { value: "pending", label: "Chờ duyệt" },
                    { value: "trash", label: "Thùng rác" },
                  ]}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant={discount ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setDiscount(true)}
                  sx={{ textTransform: "none", fontWeight: "bold", mr: 2 }}
                >
                  Thêm giảm giá
                </Button>
                {discount && (
                  <Button
                    variant={!discount ? "contained" : "outlined"}
                    color="error"
                    onClick={() => setDiscount(false)}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  >
                    X
                  </Button>
                )}
              </Grid>
              {discount && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Giảm giá"
                    name="discount"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.discount && Boolean(errors.discount)}
                    helperText={touched.discount && errors.discount}
                  />
                </Grid>
              )}
            </Grid>

            {/* Description Section */}
            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "background.default",
                p: 4,
                mx: "auto",
                borderRadius: 2,
                boxShadow: 1,
                mb: 6,
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Hình ảnh đại diện</Typography>

                  <ImageUploader
                    idupload="productThumbnail"
                    avatarSize={100}
                    name="thumbnail"
                    onUploadComplete={(url) => setFieldValue("thumbnail", url)}
                    onDelete={(url) => {
                      setFieldValue("thumbnail", "");
                      console.log(url);
                    }}
                    fooder={"products"}
                    error={touched.thumbnail && Boolean(errors.thumbnail)}
                    helperText={touched.thumbnail && errors.thumbnail}
                    dataImage={values.thumbnail ? [values.thumbnail] : []}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Hình ảnh sản phẩm</Typography>

                  <ImageUploader
                    idupload="productImages"
                    name="images"
                    onUploadComplete={(url) => {
                      const newImages = url.map((item) => item);
                      setFieldValue("images", newImages);
                      console.log(newImages);
                    }}
                    onDelete={(url) => {
                      const newImages = values.images.filter(
                        (item) => item !== url
                      );
                      setFieldValue("images", newImages);
                    }}
                    fooder={"products"}
                    error={touched.images && Boolean(errors.images)}
                    helperText={touched.images && errors.images}
                    dataImage={values.images ? values.images : []}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "background.default",
                p: 4,
                mx: "auto",
                borderRadius: 2,
                boxShadow: 1,
                mb: 6,
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6">Mô tả sản phẩm</Typography>
              </Grid>
              <Grid item xs={12}>
                <Textarea
                  label="Mô tả ngắn"
                  name="shortDescription"
                  value={values.shortDescription}
                  onChange={handleChange}
                  error={
                    touched.shortDescription && Boolean(errors.shortDescription)
                  }
                  errorMessage={errors.shortDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <Textarea
                  label="Mô tả chi tiết"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  errorMessage={errors.description}
                />
              </Grid>
            </Grid>

            {/* Classification section */}

            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "background.default",
                p: 4,
                mx: "auto",
                borderRadius: 2,
                boxShadow: 3,
                mb: 6,
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6">Phân loại sản phẩm</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDropdown
                  label="Danh mục"
                  name="category"
                  value={values.category || ""}
                  onChange={handleChange}
                  options={categorySelect}
                  error={touched.category && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDropdown
                  label="Thương hiệu"
                  name="brand"
                  value={values.brand || ""}
                  onChange={handleChange}
                  options={brandSelect}
                  error={touched.brand && Boolean(errors.brand)}
                  helperText={touched.brand && errors.brand}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={tagsSelect}
                  getOptionLabel={(option) => option.label}
                  value={values.tagsProduct
                    .map((tag, index) => {
                      const foundTag = tagsSelect.find(
                        (item) => item.value === tag
                      );
                      return foundTag ? { ...foundTag, key: index } : null;
                    })
                    .filter(Boolean)}
                  onChange={(event, newValue) => {
                    const values = newValue.map((item) => item.value);
                    setFieldValue("tagsProduct", values);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" />
                  )}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...rest } = props;
                    return (
                      <li key={key} {...rest}>
                        <Checkbox
                          checked={selected}
                          style={{ marginRight: 8 }}
                        />
                        {option.label}
                      </li>
                    );
                  }}
                />
              </Grid>
            </Grid>
            {/* Inventory Section */}

            <Grid
              container
              spacing={3}
              sx={{
                backgroundColor: "background.default",
                p: 4,
                mx: "auto",
                borderRadius: 2,
                boxShadow: 1,
                mb: 6,
                width: { xs: "100%", sm: "100%" },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6">Thông tin kho hàng</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tồn kho"
                  name="inventory"
                  value={values.inventory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.inventory && Boolean(errors.inventory)}
                  helperText={touched.inventory && errors.inventory}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomDropdown
                  label="Kho hàng"
                  name="warehouse"
                  value={values.warehouse || ""}
                  onChange={handleChange}
                  options={warehouseSelect}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Số lượng có thể bán"
                  name="onStock"
                  value={values.onStock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.onStock && Boolean(errors.onStock)}
                  helperText={touched.onStock && errors.onStock}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Số lượng hàng đang về"
                  name="inComing"
                  value={values.inComing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.inComing && Boolean(errors.inComing)}
                  helperText={touched.inComing && errors.inComing}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Số lượng tối thiểu"
                  name="minInventory"
                  value={values.minInventory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.minInventory && Boolean(errors.minInventory)}
                  helperText={touched.minInventory && errors.minInventory}
                />
              </Grid>
            </Grid>
            {/* attributes Section*/}
            <Attributes
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              openRows={openRows}
              toggleRow={(index) => toggleRow(index)}
            />

            {/* SEO Information */}

            <Box sx={{ mb: 4 }}>
              <Button
                variant={isSEO ? "contained" : "outlined"}
                color="primary"
                onClick={() => setIsSEO(true)}
                sx={{ textTransform: "none", fontWeight: "bold", mr: 2 }}
              >
                Thêm SEO
              </Button>
              {isSEO && (
                <Button
                  variant={!isSEO ? "contained" : "outlined"}
                  color="error"
                  onClick={() => setIsSEO(false)}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  X
                </Button>
              )}
            </Box>

            {isSEO && (
              <>
                <Grid
                  container
                  spacing={3}
                  sx={{
                    backgroundColor: "background.default",
                    p: 4,
                    mx: "auto",
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 6,
                    width: { xs: "100%", sm: "100%" },
                  }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">SEO</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tiêu đề SEO"
                      name="titleSEO"
                      value={values.titleSEO}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Từ khóa SEO"
                      name="keywords"
                      value={values.keywords}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textarea
                      label="Mô tả SEO"
                      name="descriptionSEO"
                      value={values.descriptionSEO}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {/* Variants Section */}
            {isVariant && (
              <>
                <Variants
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  openRows={variantopenRows}
                  setOpenRows={setVariantopenRows}
                  toggleRow={toggleVariantRow}
                />
              </>
            )}

            {/* Submit Button */}
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Đang Sửa..." : "Sửa sản phẩm"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
