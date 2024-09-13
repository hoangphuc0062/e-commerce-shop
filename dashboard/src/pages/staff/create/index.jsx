import { useState } from "react";
import {
  Switch,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import CustomButton from "../../../components/Button";
import ImageUploader from "../../TestFilebase";

function AddStaff() {
  const [banned, setBanned] = useState(false);
  const [form, setForm] = useState({
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
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    role: false,
    department: false,
    base: false,
    salary: false,
    description: false,
    avatar: false,
  });

  const validateForm = () => {
    const newErrors = {
      name: !form.name,
      email: !form.email,
      phone: !form.phone,
      address: !form.address,
      role: !form.role,
      department: !form.department,
      base: !form.base,
      salary: !form.salary,
      description: !form.description,
      avatar: !form.avatar,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // Ensures all fields are valid
  };

  const handleToggle = (setFunction, value) => {
    setFunction(!value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted", form);
    }
  };

  const handleUploadComplete = (url) => {
    console.log("Image uploaded:", url);
  };

  const handleDelete = () => {
    console.log("Image deleted");
  };
  return (
    <form>
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
                    error={errors.avatar}
                    helperText={errors.avatar ? "Vui lòng chọn ảnh" : ""}
                  />
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={banned}
                    onChange={() => handleToggle(setBanned, banned)}
                  />
                }
                label="Ban nhân viên"
              />
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
                    value={form.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    helperText={errors.name ? "Vui lòng nhập họ và tên" : ""}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    helperText={errors.email ? "Vui lòng nhập email" : ""}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    helperText={
                      errors.phone ? "Vui lòng nhập số điện thoại" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Địa chỉ"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    helperText={errors.address ? "Vui lòng nhập địa chỉ" : ""}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Chức vụ"
                    name="role"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "editor", label: "Editor" },
                      { value: "user", label: "User" },
                    ]}
                    value={form.role}
                    onChange={handleInputChange}
                    error={errors.role}
                    helperText={errors.role ? "Vui lòng chọn chức vụ" : ""}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Phòng ban"
                    name="department"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "editor", label: "Editor" },
                      { value: "user", label: "User" },
                    ]}
                    value={form.department}
                    onChange={handleInputChange}
                    error={errors.department}
                    helperText={
                      errors.department ? "Vui lòng chọn phòng ban" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Cơ sở làm việc"
                    name="base"
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "editor", label: "Editor" },
                      { value: "user", label: "User" },
                    ]}
                    value={form.base}
                    onChange={handleInputChange}
                    error={errors.base}
                    helperText={
                      errors.base ? "Vui lòng chọn cơ sở làm việc" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Lương cơ bản"
                    name="salary"
                    value={form.salary}
                    onChange={handleInputChange}
                    error={errors.salary}
                    helperText={
                      errors.salary ? "Vui lòng nhập lương cơ bản" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    error={errors.description}
                    errorMessage="Vui lòng nhập mô tả"
                    height={300}
                  />
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <CustomButton
                  label="Thêm nhân viên"
                  onClick={handleSubmit}
                  color="success"
                  style={{ marginRight: 2 }}
                />
                <CustomButton label="Hủy" color="error" variant="contained" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AddStaff;
