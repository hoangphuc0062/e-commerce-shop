import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import slugify from "../../../utils/slugify";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, resetState } from "../../../redux/slices/category";
import { handleToast } from "../../../utils/toast";
import IconModal from "../IconModal";
import Iconify from "../Iconify";
import { getBrand } from "../../../redux/slices/brand";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Tên danh mục là bắt buộc")
    .min(3, "Tên danh mục phải có ít nhất 3 ký tự")
    .max(50, "Tên danh mục không được vượt quá 50 ký tự"),
  slug: Yup.string()
    .required("Slug là bắt buộc")
    .min(3, "Slug phải có ít nhất 3 ký tự")
    .max(50, "Slug không được vượt quá 50 ký tự"),
  type: Yup.string().required("Loại là bắt buộc"),
  description: Yup.string()
    .required("Mô tả là bắt buộc")
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(250, "Mô tả không được vượt quá 250 ký tự"),
  // icon: Yup.string().notRequired().url("Icon phải là một URL hợp lệ"),
});

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataBrand, setDataBrand] = useState([]);
  const brand = useSelector((state) => state.brand.data);
  const status = useSelector((state) => state.brand.status);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setDataBrand(
        brand.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      );
    }
  }, [status, brand]);

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      slug: "",
      type: "",
      brand: [],
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createCategory(values));
      resetForm();
    },
  });

  const createStatus = useSelector(
    (state) => state.category.createCategoryStatus
  );

  useEffect(() => {
    if (createStatus === "success") {
      handleToast("success", "Thêm danh mục thành công");
      navigate("/dashboard/category");
      dispatch(resetState({ key: "createCategoryStatus", value: "idle" }));
    }
    if (createStatus === "failed") {
      handleToast("error", "Thêm danh mục thất bại");
    }
  }, [createStatus, dispatch, navigate]);

  const handleChangeName = (e) => {
    const { value } = e.target;
    formik.setFieldValue("name", value);
    formik.setFieldValue("slug", slugify(value));
  };

  const toggleIconModal = () => setOpen(true);
  const handleSubmit = (icon) => {
    formik.setFieldValue("icon", icon);
    setOpen(false);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconModal
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={handleSubmit}
            />
            <Iconify icon={formik.values.icon} width={30} />
            <Button onClick={toggleIconModal}>Chọn Icon</Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Tên danh mục"
              name="name"
              value={formik.values.name}
              onChange={handleChangeName}
              margin="normal"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={formik.values.slug}
              onChange={formik.handleChange}
              margin="normal"
              error={formik.touched.slug && Boolean(formik.errors.slug)}
              helperText={formik.touched.slug && formik.errors.slug}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl
              fullWidth
              sx={{ mt: 2 }}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <InputLabel id="category">Loại</InputLabel>
              <Select
                labelId="category"
                id="category"
                name="type"
                label="Loại"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <MenuItem value="product">Sản phẩm</MenuItem>
                <MenuItem value="post">Bài đăng</MenuItem>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.type}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                options={dataBrand}
                getOptionLabel={(option) => option.label}
                value={formik.values.brand
                  .map((tag) => dataBrand.find((item) => item.value === tag))
                  .filter(Boolean)}
                onChange={(event, newValue) =>
                  formik.setFieldValue(
                    "brand",
                    newValue.map((item) => item.value)
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="brand" />
                )}
                renderOption={(props, option, { selected }) => (
                  <li key={option.value} {...props}>
                    {" "}
                    <Checkbox checked={selected} style={{ marginRight: 8 }} />
                    {option.label}
                  </li>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Textarea
              label="Mô tả"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              errorMessage={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
                color="success"
              >
                Thêm danh mục
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => navigate("/dashboard/category")}
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CategoryCreate;
