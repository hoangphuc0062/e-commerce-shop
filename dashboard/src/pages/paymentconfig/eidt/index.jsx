import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import propTypes from "prop-types";
import VietQRBankList from "../backs";
import * as Yup from "yup";
import { useFormik } from "formik";

const EditPaymentDialog = ({ open, onClose, initialValues, onSave }) => {
  // Validation schema với Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên tài khoản không được để trống"),
    accountNumber: Yup.string()
      .required("Số tài khoản không được để trống")
      .matches(/^\d+$/, "Số tài khoản chỉ được chứa số")
      .min(9, "Số tài khoản phải có ít nhất 9 ký tự")
      .max(12, "Số tài khoản không được vượt quá 12 ký tự"),
    bank: Yup.string().required("Ngân hàng không được để trống"),
    bankBranch: Yup.string().required("Chi nhánh không được để trống"),
    accountOwner: Yup.string()
      .required("Chủ tài khoản không được để trống")
      .matches(/^[a-zA-Z\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),
    note: Yup.string().required("Ghi chú không được để trống"),
  });

  // Sử dụng formik để quản lý form
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      accountNumber: "",
      bank: "",
      bankBranch: "",
      accountOwner: "",
      note: "",
    },
    validationSchema,
    enableReinitialize: true, // Cập nhật lại initialValues khi giá trị của nó thay đổi
    onSubmit: (values) => {
      onSave(values); // Gọi hàm onSave và truyền dữ liệu đã chỉnh sửa
    },
  });

  const handleBankSelect = (selectedBank) => {
    formik.setFieldValue("bank", selectedBank.shortName);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên tài khoản"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Số tài khoản"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={
              formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
            }
            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
          />
          <VietQRBankList
            data={handleBankSelect}
            valuedata={{ short_name: formik.values.bank }}
          />
          <FormControl
            fullWidth
            margin="dense"
            error={formik.touched.bankBranch && Boolean(formik.errors.bankBranch)}
          >
            <InputLabel id="bankBranch-label">Chi nhánh</InputLabel>
            <Select
              labelId="bankBranch-label"
              name="bankBranch"
              value={formik.values.bankBranch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Hà Nội">Hà Nội</MenuItem>
              <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
              <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
            {formik.touched.bankBranch && formik.errors.bankBranch && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formik.errors.bankBranch}
              </p>
            )}
          </FormControl>
          <TextField
            label="Chủ tài khoản"
            name="accountOwner"
            value={formik.values.accountOwner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="dense"
            error={
              formik.touched.accountOwner && Boolean(formik.errors.accountOwner)
            }
            helperText={formik.touched.accountOwner && formik.errors.accountOwner}
          />
          <FormControl
            fullWidth
            margin="dense"
            error={formik.touched.note && Boolean(formik.errors.note)}
          >
            <InputLabel id="note-label">Ghi chú</InputLabel>
            <Select
              labelId="note-label"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="Tài khoản chính">Tài khoản chính</MenuItem>
              <MenuItem value="Tài khoản phụ">Tài khoản phụ</MenuItem>
              <MenuItem value="Dùng cho giao dịch quốc tế">
                Dùng cho giao dịch quốc tế
              </MenuItem>
            </Select>
            {formik.touched.note && formik.errors.note && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formik.errors.note}
              </p>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditPaymentDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object,
  onSave: propTypes.func.isRequired,
};

export default EditPaymentDialog;
