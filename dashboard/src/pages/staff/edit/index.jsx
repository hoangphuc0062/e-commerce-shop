import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import CustomDropdown from "../../../components/Dropdown";
import Textarea from "../../../components/textarea";
import { StaffSchema } from "../validade/create";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffById } from "../../../redux/slices/staff";

// Assume options are coming from an external source or can be passed as props
const options = {
  roles: [
    { value: "1", label: "Quản trị viên" },
    { value: "2", label: "Biên tập viên" },
    { value: "3", label: "Nhân viên" },
  ],
  departments: [
    { value: "Sale", label: "Marketing" },
    { value: "Support", label: "Hỗ trợ viên" },
    { value: "Warehouse", label: "Kho" },
    { value: "Accounting", label: "Kế toán" },
  ],
  bases: [
    { value: "cơ sở 1", label: "cơ sở 1" },
    { value: "cơ sở 2", label: "cơ sở 2" },
  ],
};
function EditStaff() {
  const dispatch = useDispatch();
  const [staffData, setStaffData] = useState();
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const status = useSelector((state) => state.staff.getStaffByIdStatus);
  const Data = useSelector((state) => state.staff.data);
  console.log("staffData", Data);
  useEffect(() => {
    if (id) {
      dispatch(getStaffById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "success") {
      setStaffData({
        name: Data.name,
        email: Data.email,
        phone: Data.phone,
        address: Data.address,
        role: Data.role,
        department: Data.department,
        base: Data.base,
        salary: Data.salary,
        description: Data.description,
        avatar: Data.avatar,
      });
    }
  }, [status, Data]);

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
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("Submitting edit form", values);
      try {
        handleToast("success", "Nhân viên đã được cập nhật", "top-right");
        navigate("/dashboard/staff");
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
