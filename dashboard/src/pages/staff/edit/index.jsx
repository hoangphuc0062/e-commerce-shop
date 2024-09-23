import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import { StaffSchema } from "../validade/create";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { useEffect, useState } from "react";

// Assume options are coming from an external source or can be passed as props
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

function EditStaff() {
  const { id } = useParams(); // Get the staff ID from the route
  const location = useLocation(); // Get the staff data passed via state
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState(null);

  // Fetch staff data or use data passed from location state
  useEffect(() => {
    if (location.state && location.state.staff) {
      setStaffData(location.state.staff); // Set data from state if available
    } else {
      // Example: Replace this with an actual API call to fetch staff data by ID
      fetchStaffDataById(id);
    }
  }, [id, location.state]);

  const fetchStaffDataById = (staffId) => {
    // Simulate an API call to fetch staff data by ID
    const fetchedData = {
      id: staffId,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0912345678",
      address: "123 Street Name",
      role: "Manager",
      department: "Sales",
      base: "Hà Nội",
      salary: "20000000",
      description: "This is a description.",
      avatar: "https://i.pravatar.cc/150?img=1",
    };
    setStaffData(fetchedData); // Set the fetched data
  };

  const formik = useFormik({
    initialValues: {
      name: staffData?.name || "",
      email: staffData?.email || "",
      phone: staffData?.phone || "",
      address: staffData?.address || "",
      role: staffData?.role || "",
      department: staffData?.department || "",
      base: staffData?.base || "",
      salary: staffData?.salary || "",
      description: staffData?.description || "",
      avatar: staffData?.avatar || "",
    },
    validationSchema: StaffSchema,
    enableReinitialize: true, // Allow Formik to reinitialize the form when staffData changes
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitting edit form", values);
      try {
        // handleSave(values); // Pass updated data through handleSave function
        handleToast("success", "Nhân viên đã được cập nhật", "top-right");
        navigate("/dashboard/staff"); // Navigate back to staff list after save
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

  // Don't render the form until the data is loaded
  if (!staffData) {
    return <p>Loading staff data...</p>;
  }

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
                    {...getErrorProps("avatar")}
                    onBlur={formik.handleBlur}
                    folder="staff" // Change dynamically if needed
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
                  aria-label="Save Staff"
                >
                  Lưu thay đổi
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

export default EditStaff;
