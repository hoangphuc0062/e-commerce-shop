import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import propTypes from "prop-types";
import { CategorySchema } from "../validade/CategorySchema";
import Textarea from "../../../components/textarea";
import ImageUploader from "../../../components/upload";

const EditCategoryDialog = ({ open, onClose, initialValues, onSave }) => {
  const formik = useFormik({
    initialValues: {
      name: initialValues.name || "", // Ensure default empty values
      description: initialValues.description || "",
      image: initialValues.image || "",
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      onSave(values); // Pass form values to the save handler
      onClose(); // Close the dialog
    },
  });

  // Update formik values when initialValues prop changes
  useEffect(() => {
    if (initialValues) {
      formik.setValues({
        name: initialValues.name || "",
        description: initialValues.description || "",
        image: initialValues.image || "",
      });
    }
  }, [initialValues]); // Run effect when initialValues change

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
    >
      <DialogTitle sx={{ fontSize: "1.5rem" }}>Chỉnh sửa danh mục</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            minWidth: "600px",
            minHeight: "400px",
          }}
        >
          <ImageUploader
            onUploadComplete={(url) => formik.setFieldValue("image", url)}
            fooder="categories"
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            imageUrl={formik.values.image}
          />
          <TextField
            label="Tên danh mục"
            fullWidth
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mb: 2, fontSize: "1rem" }}
            InputLabelProps={{
              sx: { fontSize: "1.2rem" },
            }}
          />

          <Textarea
            label="Mô tả"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            height={300}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} size="large">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditCategoryDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object.isRequired,
  onSave: propTypes.func.isRequired,
};

export default EditCategoryDialog;
