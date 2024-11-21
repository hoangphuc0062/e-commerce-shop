/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Divider,
  Autocomplete,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import CustomDropdown from "../../../components/Dropdown";
import Attributes from "./Attributes";

const CreateProduct = () => {
  const [isVariant, setIsVariant] = useState(false);

  const initialValues = {
    name: "",
    slug: "",
    SKU: "",
    historicalPrice: "",
    priceInMarket: "",
    price: "",
    discount: "",
    inventory: "",
    onStock: "",
    inComing: "",
    minInventory: "",
    maxInventory: "",
    isBattery: true,
    isStopSelling: false,
    status: "",
    description: "",
    shortDescription: "",
    keywords: "",
    titleSEO: "",
    descriptionSEO: "",
    thumbnail: "",
    images: [],
    videos: "",
    views: 1,
    category: "",
    brand: "",
    warehouse: "",
    tagsProduct: [],
    attributes: [{ title: "", details: [{ key: "", value: "" }] }],
    variants: [
      {
        key: "",
        value: "",
        SKU: "",
        price: "",
        priceInMarket: "",
        historicalPrice: "",
        discount: "",
        inventory: "",
        minInventory: "",
        maxInventory: "",
        onStock: "",
        inComing: "",
        thumbnail: "",
        children: [
          {
            key: "",
            value: "",
            SKU: "",
            price: "",
            discount: "",
            inventory: "",
            minInventory: "",
            maxInventory: "",
            onStock: "",
            inComing: "",
            thumbnail: "",
          },
        ],
      },
    ],
    filter: {},
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên sản phẩm là bắt buộc"),
    slug: Yup.string().required("Slug là bắt buộc"),
    price: Yup.number().typeError("Phải là một số").required("Giá là bắt buộc"),
    discount: Yup.number().typeError("Phải là một số"),
    inventory: Yup.number().typeError("Phải là một số"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
  };

  const [openRows, setOpenRows] = React.useState({});

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        p: 4,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
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
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form>
            {/* General Information */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Thông tin sản phẩm
            </Typography>
            <Divider />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
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
            </Grid>
            {/* Description Section */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              Mô tả sản phẩm
            </Typography>
            <Divider />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mô tả ngắn"
                  name="shortDescription"
                  value={values.shortDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.shortDescription && Boolean(errors.shortDescription)
                  }
                  helperText={
                    touched.shortDescription && errors.shortDescription
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mô tả"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
            </Grid>

            {/* Classification section */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              Phân loại sản phẩm
            </Typography>
            <Divider />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <CustomDropdown
                  label="Danh mục"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  options={[
                    { label: "Danh mục 1", value: "category1" },
                    { label: "Danh mục 2", value: "category2" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDropdown
                  label="Thương hiệu"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                  options={[
                    { label: "Thương hiệu 1", value: "brand1" },
                    { label: "Thương hiệu 2", value: "brand2" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  multiple
                  options={["Tag1", "Tag2", "Tag3", "Tag4"]}
                  value={values.tagsProduct}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "tagsProduct",
                        value: newValue,
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Tags"
                      placeholder="Choose tags"
                      error={Boolean(errors.tagsProduct && touched.tagsProduct)}
                      helperText={touched.tagsProduct && errors.tagsProduct}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* Inventory Section */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              Thông tin kho hàng
            </Typography>
            <Divider />
            <Grid container spacing={3}>
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
                  value={values.warehouse}
                  onChange={handleChange}
                  options={[
                    { label: "Kho A", value: "warehouseA" },
                    { label: "Kho B", value: "warehouseB" },
                  ]}
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
              toggleRow={toggleRow}
            />

            {/* SEO Information */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
              SEO
            </Typography>
            <Divider />
            <Grid container spacing={3}>
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
                <TextField
                  fullWidth
                  label="Mô tả SEO"
                  name="descriptionSEO"
                  value={values.descriptionSEO}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>

            {/* Variants Section */}
            {isVariant && (
              <>
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Biến thể sản phẩm
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <FieldArray
                  name="variants"
                  render={(arrayHelpers) => (
                    <>
                      {values.variants.map((variant, index) => (
                        <Grid container spacing={3} key={index}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              label="Tên biến thể"
                              name={`variants[${index}].key`}
                              value={variant.key}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              label="Giá trị biến thể"
                              name={`variants[${index}].value`}
                              value={variant.value}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              color="error"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="outlined"
                        onClick={() =>
                          arrayHelpers.push({ key: "", value: "" })
                        }
                        startIcon={<Add />}
                      >
                        Thêm biến thể
                      </Button>
                    </>
                  )}
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
                {isSubmitting ? "Đang tạo..." : "Tạo sản phẩm"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateProduct;
