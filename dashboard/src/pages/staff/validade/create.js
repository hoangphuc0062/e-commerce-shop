import * as Yup from "yup";
export const StaffSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
  role: Yup.string().required("Vui lòng chọn chức vụ"),
  department: Yup.string().required("Vui lòng chọn phòng ban"),
  base: Yup.string().required("Vui lòng chọn cơ sở làm việc"),
  salary: Yup.string().required("Vui lòng nhập lương cơ bản"),
  description: Yup.string().required("Vui lòng nhập mô tả"),
  avatar: Yup.string().required("Vui lòng chọn ảnh"),
  banned: Yup.boolean(),
  fixedSalary: Yup.string().required("Vui lòng nhập lương cố định"),
  commission: Yup.string().required("Vui lòng nhập tỉ lệ hoa hồng"),
  status: Yup.string().required("Vui lòng chọn trạng thái"),
  totalSalary: Yup.string().required("Vui lòng nhập tổng lương"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu không khớp"
  ),
  dob: Yup.string().required("Vui lòng nhập ngày sinh"),
});
