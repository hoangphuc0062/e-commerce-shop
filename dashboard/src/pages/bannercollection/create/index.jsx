import {
  Grid,
  Box,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Card,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../components/upload";
import { BannerSchema } from "../validate/bannerConllection";
import { handleToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCollections } from "../../../redux/slices/collection";
import { getCategory } from "../../../redux/slices/category";
import { getBrand } from "../../../redux/slices/brand";
import { createBannerCollection } from "../../../redux/slices/BannerCollection";
import Textarea from "../../../components/textarea";

const collectionStatus = [
  { value: "true", label: "Hoạt động" },
  { value: "false", label: "Không hoạt động" },
];

function AddBannerCollection() {
  const dispatch = useDispatch();

  const [collectionOptions, setCollectionOptions] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);

  const statusCollection = useSelector((state) => state.collection.status);
  const dataCollection = useSelector((state) => state.collection.data);
  const statusCategory = useSelector((state) => state.category.status);
  const dataCategory = useSelector((state) => state.category.data.categories);
  const statusBrand = useSelector((state) => state.brand.status);
  const dataBrand = useSelector((state) => state.brand.data);

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  useEffect(() => {
    if (statusCollection === "succeeded" && dataCollection) {
      const collectionOptions = dataCollection?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCollectionOptions(collectionOptions);
    }
  }, [statusCollection, dataCollection]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (statusCategory === "success" && dataCategory) {
      const categorySelect = dataCategory?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategorySelect(categorySelect);
    }
  }, [statusCategory, dataCategory]);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    if (statusBrand === "success") {
      const brandSelect = dataBrand.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setBrandSelect(brandSelect);
    }
  }, [statusBrand, dataBrand]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      series: "",
      brand: "",
      category: "",
      status: "active",
      banner: [
        {
          name: "",
          urlImage: "",
          refUrl: "",
          position: 0,
          shotDescription: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
    validationSchema: BannerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(createBannerCollection(values)).then((result) => {
        console.log(result);
        if (
          result.type === "bannerCollection/createBannerCollection/fulfilled"
        ) {
          handleToast("success", "Thêm bộ sưu tập banner thành công");
          resetForm();
        } else {
          handleToast("error", "Thêm bộ sưu tập banner thất bại");
        }
      });
      console.log(values);
    },
  });

  const handleUploadComplete = (url, index) => {
    formik.setFieldValue(`banner[${index}].urlImage`, url);
  };

  const handleDelete = (index) => {
    formik.setFieldValue(`banner[${index}].urlImage`, "");
  };

  const addNewBanner = () => {
    formik.setFieldValue("banner", [
      ...formik.values.banner,
      { name: "", urlImage: "", refUrl: "", position: "", shotDescription: "" },
    ]);
  };

  const removeBanner = (index) => {
    const updatedBanners = formik.values.banner.filter((_, i) => i !== index);
    formik.setFieldValue("banner", updatedBanners);
  };

  const getErrorProps = (name) => ({
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              {formik.values.banner.map((bannerItem, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    p: 3,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <ImageUploader
                        onUploadComplete={(url) => handleUploadComplete(url, index)}
                        onDelete={() => handleDelete(index)}
                        avatarSize={100}
                        idupload={`banner[${index}].urlImage`}
                        value={bannerItem.urlImage}
                        {...getErrorProps(`banner[${index}].urlImage`)}
                        onBlur={formik.handleBlur}
                        fooder="banner"
                        dataImage={bannerItem.urlImage ? [bannerItem.urlImage] : []}
                      />
                      {formik.touched.banner?.[index]?.urlImage &&
                        formik.errors.banner?.[index]?.urlImage && (
                          <FormHelperText error>
                            {formik.errors.banner[index].urlImage}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Tên Banner"
                        name={`banner[${index}].name`}
                        value={bannerItem.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.name &&
                          Boolean(formik.errors.banner?.[index]?.name)
                        }
                        helperText={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.name &&
                          formik.errors.banner?.[index]?.name
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Ref URL"
                        name={`banner[${index}].refUrl`}
                        value={bannerItem.refUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.refUrl &&
                          Boolean(formik.errors.banner?.[index]?.refUrl)
                        }
                        helperText={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.refUrl &&
                          formik.errors.banner?.[index]?.refUrl
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Mức độ ưu tiên"
                        name={`banner[${index}].position`}
                        value={bannerItem.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.position &&
                          Boolean(formik.errors.banner?.[index]?.position)
                        }
                        helperText={
                          formik.touched.banner &&
                          formik.touched.banner[index]?.position &&
                          formik.errors.banner?.[index]?.position
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Ngày Bắt Đầu"
                        name={`banner[${index}].startDate`}
                        type="date"
                        value={formik.values.banner[index]?.startDate}
                        onChange={formik.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={
                          formik.touched.banner?.[index]?.startDate &&
                          Boolean(formik.errors.banner?.[index]?.startDate)
                        }
                        helperText={
                          formik.touched.banner?.[index]?.startDate &&
                          formik.errors.banner?.[index]?.startDate
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Ngày Kết Thúc"
                        name={`banner[${index}].endDate`}
                        type="date"
                        value={formik.values.banner[index]?.endDate}
                        onChange={formik.handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        sx={{ mt: 2 }}
                        error={
                          formik.touched.banner?.[index]?.endDate &&
                          Boolean(formik.errors.banner?.[index]?.endDate)
                        }
                        helperText={
                          formik.touched.banner?.[index]?.endDate &&
                          formik.errors.banner?.[index]?.endDate
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <textarea
                        label="Mô tả"
                        name={`banner[${index}].shotDescription`}
                        value={bannerItem.shotDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          padding: "12px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          fontSize: "14px",
                        }}
                        rows="4"
                        className={
                          formik.touched.banner &&
                            formik.touched.banner[index]?.shotDescription &&
                            Boolean(formik.errors.banner?.[index]?.shotDescription)
                            ? "error"
                            : ""
                        }
                      />
                      {formik.touched.banner &&
                        formik.touched.banner[index]?.shotDescription &&
                        formik.errors.banner?.[index]?.shotDescription && (
                          <div
                            style={{
                              color: "red",
                              marginTop: "4px",
                            }}
                          >
                            {formik.errors.banner?.[index]?.shotDescription}
                          </div>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeBanner(index)}
                        sx={{ mt: 2 }}
                      >
                        Xóa
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={addNewBanner}
              sx={{ mt: 2 }}
            >
              Thêm Banner Mới
            </Button>
          </Grid>
          {/* Banner Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tiêu đề"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Bộ sưu tập</InputLabel>
                    <Select
                      label="Bộ sưu tập"
                      name="series"
                      value={formik.values.series}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.series && Boolean(formik.errors.series)
                      }
                    >
                      {collectionOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.series && formik.errors.series && (
                      <FormHelperText error>
                        {formik.errors.series}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                      label="Danh mục"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.category &&
                        Boolean(formik.errors.category)
                      }
                    >
                      {categorySelect.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error>
                        {formik.errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Thương hiệu</InputLabel>
                    <Select
                      label="Thương hiệu"
                      name="brand"
                      value={formik.values.brand}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.brand && Boolean(formik.errors.brand)
                      }
                    >
                      {brandSelect.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.brand && formik.errors.brand && (
                      <FormHelperText error>
                        {formik.errors.brand}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      label="Trạng thái"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                    >
                      {collectionStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <FormHelperText error>
                        {formik.errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    errorMessage={formik.errors.description}
                  />
                </Grid>
              </Grid>

              {/* Submit and Cancel Buttons */}
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label="Add Banner"
                >
                  Thêm bộ sưu tập banner
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/dashboard/bannercollection")}
                  style={{ marginLeft: 10 }}
                  aria-label="Cancel"
                >
                  Hủy
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AddBannerCollection;
