import * as Yup from "yup";
export const WebconFigValidate = Yup.object({
  title: Yup.string()
    .required("Tiêu đề không được để trống")
    .min(5, "Tiêu đề phải ít nhất 5 ký tự")
    .max(100, "Tiêu đề không được vượt quá 100 ký tự"),

  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),

  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Số điện thoại không hợp lệ (phải từ 10 đến 15 chữ số và có thể bắt đầu bằng dấu +)") // Regex for phone with optional +
    .required("Số điện thoại không được để trống"),

  address: Yup.string()
    .required("Địa chỉ không được để trống")
    .min(10, "Địa chỉ phải ít nhất 10 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự"),


  facebook: Yup.string()
    .url("URL Facebook không hợp lệ")
    .nullable(),

  tiktok: Yup.string()
    .url("URL TikTok không hợp lệ")
    .nullable(),

  // Add any additional fields here
  website: Yup.string()
    .url("URL website không hợp lệ")
    .nullable(),

  description: Yup.string()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .nullable(),
});
