import * as Yup from "yup";

export const StaffSchema = Yup.object({
  name: Yup.string()
    .required("Tên không được để trống")
    .max(250, "Tên không được vượt quá 250 ký tự"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .max(15, "Số điện thoại không được vượt quá 15 ký tự"),
  role: Yup.string()
    .required("Chức vụ không được để trống")
    .max(100, "Chức vụ không được vượt quá 100 ký tự"),
  department: Yup.string()
    .required("Phòng ban không được để trống")
    .max(100, "Phòng ban không được vượt quá 100 ký tự"),
  base: Yup.string()
    .required("Cơ sở làm việc không được để trống")
    .max(100, "Cơ sở làm việc không được vượt quá 100 ký tự"),
  fixedSalary: Yup.number()
    .required("Lương cơ bản không được để trống")
    .typeError("Lương cơ bản phải là một số")
    .min(0, "Lương cơ bản phải lớn hơn hoặc bằng 0"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không được vượt quá 50 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Nhập lại mật khẩu không được để trống"),
  // avatar: Yup.string()
  // .required("Ảnh đại diện là bắt buộc"),
});
