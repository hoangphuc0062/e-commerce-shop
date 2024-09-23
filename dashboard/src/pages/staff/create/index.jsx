import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import { StaffSchema } from "../validade/create";
import { useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";

const options = {
  roles: [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "user", label: "User" },
  ],
  departments: [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "user", label: "User" },
  ],
  bases: [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "user", label: "User" },
  ],
};

function AddStaff() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      department: "",
      base: "",
      salary: "",
      description: "",
      avatar: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: StaffSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      console.log("Before validation and submission", values);
      try {
        // Perform your actual submission logic here
        handleToast("success", "Nhân viên đã được thêm", "top-right");
        console.log("Form submitted", values);
        resetForm(); // Reset form fields after submission
      } catch (error) {
        console.error("Error during form submission", error);
      }
    },
  });

  const handleUploadComplete = (url) => {
    console.log("Image uploaded:", url);
    formik.setFieldValue("avatar", url);
  };

  const handleDelete = () => {
    console.log("Image deleted");
    formik.setFieldValue("avatar", "");
  };

  const getErrorProps = (name) => ({
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {" "}
      {/* Sử dụng handleSubmit của Formik */}
      <Box p={3}>
        <Grid container spacing={3}>
          {/* Profile Upload Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">Ảnh hồ sơ</Typography>
                <Box>
                  <ImageUploader
                    onUploadComplete={handleUploadComplete}
                    onDelete={handleDelete}
                    avatarSize={100}
                    {...getErrorProps("avatar")}
                    onBlur={formik.handleBlur}
                    fooder="staff" // thay đổi dynamic nếu cần
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* User Information Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Họ và tên"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    {...getErrorProps("name")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    {...getErrorProps("email")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Số điện thoại"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    {...getErrorProps("phone")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Địa chỉ"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    {...getErrorProps("address")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Chức vụ"
                    name="role"
                    options={options.roles}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    {...getErrorProps("role")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Phòng ban"
                    name="department"
                    options={options.departments}
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    {...getErrorProps("department")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Cơ sở làm việc"
                    name="base"
                    options={options.bases}
                    value={formik.values.base}
                    onChange={formik.handleChange}
                    {...getErrorProps("base")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Lương cơ bản"
                    name="salary"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    {...getErrorProps("salary")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Mật khẩu"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    {...getErrorProps("password")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    {...getErrorProps("confirmPassword")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    {...getErrorProps("description")}
                    height={300}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  aria-label="Add Staff"
                >
                  Thêm nhân viên
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/dashboard/staff")}
                  style={{ marginLeft: 10 }}
                  aria-label="Cancel"
                >
                  Hủy
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AddStaff;
