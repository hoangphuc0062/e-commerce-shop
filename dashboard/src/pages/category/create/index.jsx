import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Modal,
  IconButton,
  InputAdornment,
  Stack,
  Grid,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import slugify from "../../../utils/slugify";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIcon } from "../../../redux/slices/icon";
import { createCategory, resetState } from "../../../redux/slices/category";
import { handleToast } from "../../../utils/toast";

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [iconList, setIconList] = useState([]);
  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      slug: "",
      type: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên danh mục là bắt buộc"),
      slug: Yup.string().required("Slug là bắt buộc"),
      type: Yup.string().required("Loại là bắt buộc"),
      description: Yup.string().required("Mô tả là bắt buộc"),
      // icon: Yup.string().required("Icon là bắt buộc"),
    }),
    onSubmit: (values) => {
      const { name, slug, type, description, iconId } = values;
      setIsSubmitting(true); // Set loading state
      dispatch(createCategory({ name, slug, type, description, icon: iconId }));
    },
  });

  const toggleIconModal = () => {
    setIsIconModalOpen(!isIconModalOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIconSelect = (id, iconData) => {
    formik.setFieldValue("icon", iconData.className);
    formik.setFieldValue("iconId", id);
    toggleIconModal();
  };

  const status = useSelector((state) => state.icon.status);
  const data = useSelector((state) => state.icon.data);
  const createStatus = useSelector(
    (state) => state.category.createCategoryStatus
  );

  useEffect(() => {
    dispatch(getIcon());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      setIconList(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          className: item.className, // Ensure you're using the correct property
        }))
      );
    }
  }, [status, data]);

  useEffect(() => {
    if (createStatus === "success") {
      handleToast("success", "Thêm danh mục thành công");
      navigate("/dashboard/category");
      setIsSubmitting(false);
      dispatch(resetState({ key: "createCategoryStatus", value: "idle" }));
    }
    if (createStatus === "failed") {
      handleToast("error", "Thêm danh mục thất bại");
      setIsSubmitting(false); // Reset loading state
    }
  }, [createStatus, dispatch]);

  // Filter icons based on search query
  const filteredIcons = iconList.filter((icon) =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangeName = (e) => {
    formik.setFieldValue("name", e.target.value);
    formik.setFieldValue("slug", slugify(e.target.value));
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
            {formik.values.icon && (
              <Icon icon={`eva:${formik.values.icon}`} width={24} height={24} />
            )}
            <Button onClick={toggleIconModal}>Chọn Icon</Button>
            {formik.errors.icon && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.icon}
              </div>
            )}
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
            <TextField
              fullWidth
              label="Loại"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              margin="normal"
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />
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
              helperText={
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang thêm..." : "Thêm danh mục"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => navigate("/dashboard/category")}
                disabled={isSubmitting} // Disable button when submitting
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Modal open={isIconModalOpen} onClose={toggleIconModal}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            margin: "100px auto",
            width: "400px",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <h2>Chọn Icon</h2>

          <TextField
            fullWidth
            placeholder="Tìm kiếm icon"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" flexWrap="wrap">
            {filteredIcons.map((icon, i) => (
              <IconButton
                key={i}
                onClick={() =>
                  handleIconSelect(icon.id, {
                    name: icon.name,
                    className: icon.className,
                  })
                }
              >
                <Icon icon={`eva:${icon.className}`} />
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default CategoryCreate;
