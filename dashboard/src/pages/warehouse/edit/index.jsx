/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // Correct way to import Yup
import Textarea from "../../../components/Textarea";

export default function EditWarehouse({
  open,
  handleClose,
  handleUpdate,
  warehouseData,
}) {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Tên kho là bắt buộc")
      .min(3, "Tên kho phải có ít nhất 3 ký tự")
      .max(250, "Tên kho không được vượt quá 250 ký tự"),
    address: Yup.string()
      .required("Địa chỉ là bắt buộc")
      .min(10, "Địa chỉ phải có ít nhất 10 ký tự")
      .max(250, "Địa chỉ không được vượt quá 250 ký tự"),
    description: Yup.string()
      .required("Mô tả là bắt buộc")
      .min(20, "Mô tả phải có ít nhất 20 ký tự")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa thông tin kho</DialogTitle>

      <Formik
        initialValues={{
          id: warehouseData?.id || "",
          name: warehouseData?.name || "",
          address: warehouseData?.address || "",
          description: warehouseData?.description || "",
          isBlocked: warehouseData?.isBlocked || false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleUpdate(values);
          handleClose();
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên kho"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    errorMessage={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isBlocked"
                        checked={values.isBlocked}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                    label="Trạng thái khóa"
                  />
                  {touched.isBlocked && errors.isBlocked && (
                    <div style={{ color: "red" }}>{errors.isBlocked}</div>
                  )}
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">
                  Hủy
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Cập nhật
                </Button>
              </DialogActions>
            </DialogContent>

          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
