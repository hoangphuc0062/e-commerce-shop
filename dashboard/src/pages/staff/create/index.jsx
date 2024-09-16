import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import { StaffSchema } from "../validade/create";
import { useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "user", label: "User" },
];

const departmentOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "user", label: "User" },
];

const baseOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "user", label: "User" },
];

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
    },
    validationSchema: StaffSchema, // Import from validate/create.js
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Form submitted", values);
      handleToast("success", "Nhân viên đã được thêm", "top-right");
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

  return (
    <form onSubmit={formik.handleSubmit}>
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
                    error={
                      formik.touched.avatar && Boolean(formik.errors.avatar)
                    }
                    helperText={formik.touched.avatar && formik.errors.avatar}
                    onBlur={formik.handleBlur}
                    fooder="staff" // phải thay đổi fooder thành staff hoặc user,.....
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
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Số điện thoại"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && !!formik.errors.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Địa chỉ"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && !!formik.errors.address}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Chức vụ"
                    name="role"
                    options={roleOptions}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && !!formik.errors.role}
                    helperText={formik.touched.role && formik.errors.role}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Phòng ban"
                    name="department"
                    options={departmentOptions}
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.department && !!formik.errors.department
                    }
                    helperText={
                      formik.touched.department && formik.errors.department
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Cơ sở làm việc"
                    name="base"
                    options={baseOptions}
                    value={formik.values.base}
                    onChange={formik.handleChange}
                    error={formik.touched.base && !!formik.errors.base}
                    helperText={formik.touched.base && formik.errors.base}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Lương cơ bản"
                    name="salary"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    error={formik.touched.salary && !!formik.errors.salary}
                    helperText={formik.touched.salary && formik.errors.salary}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description && !!formik.errors.description
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    height={300}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button variant="contained" type="submit" color="success">
                  Thêm nhân viên
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/dashboard/staff")}
                  style={{ marginLeft: 10 }}
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
