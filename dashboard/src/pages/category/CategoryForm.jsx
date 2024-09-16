import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

import propTypes from "prop-types";
import Textarea from "../../components/textarea";
import ImageUploader from "../../components/upload";
import { useFormik } from "formik";
import { CategorySchema } from "./validade/CategorySchema";

const CategoryForm = ({ categories, onAddCategory }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      parentId: "",
      description: "",
      image: "",
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {
      onAddCategory(values);
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      mb={2}
    >
      <ImageUploader
        onUploadComplete={(url) => formik.setFieldValue("image", url)}
        fooder="categories"
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      <Select
        name="parentId"
        value={formik.values.parentId}
        onChange={formik.handleChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
        onBlur={formik.handleBlur}
      >
        <MenuItem value="">Chọn danh mục cha</MenuItem>
        {categories
          .filter((cat) => !cat.parentId)
          .map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
      </Select>

      <TextField
        label="Tên danh mục"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        sx={{ mb: 2 }}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <Textarea
        label="Mô tả"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        height={300}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <Button variant="contained" color="primary" type="submit">
        Thêm danh mục
      </Button>
    </Box>
  );
};

CategoryForm.propTypes = {
  categories: propTypes.array.isRequired,
  onAddCategory: propTypes.func.isRequired,
};

export default CategoryForm;
