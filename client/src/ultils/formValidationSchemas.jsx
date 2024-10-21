// utils/formValidationSchemas.js
import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Họ và tên là bắt buộc"),
  phone: Yup.string().required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});
