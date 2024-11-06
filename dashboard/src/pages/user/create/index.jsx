import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required(" Tên người dùng là bắt buộc")
    .min(2, "Tên khách hàng tối thiểu 2 ký tự"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .required("Số điện thoại không được để trống")
    .max(12, "Số điện thoại tối đa 12 ký tự")
    .min(10, "Số điện thoại tối thiểu 10 ký tự"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Cần có mật khẩu"),
});

export default function CreatePageUser({ open, handleClose, onSaved }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      onSaved(values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Tên người dùng"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="dense"
          />
          <TextField
            label="số điện thoại"
            name="phone"
            type="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
            margin="dense"
          />
          <TextField
            label="mật khẩu"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            margin="dense"
          />
          <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
            <Button type="submit" variant="contained" color="primary">
              Thêm Khách hàng
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
