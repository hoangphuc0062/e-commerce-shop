import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Grid, Paper, Button, TextField } from "@mui/material";
import { handleToast } from "../../../utils/toast";
import Textarea from "../../../components/textarea";
import CustomDropdown from "../../../components/Dropdown";
import { useNavigate } from "react-router-dom";

function AddWarehouse() {
  const navigate = useNavigate();
  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      describe: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên kho là bắt buộc"),
      address: Yup.string().required("Địa chỉ là bắt buộc"),
      describe: Yup.string().required("Mô tả là bắt buộc"),
      status: Yup.string().required("Trạng thái là bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission, e.g., send data to an API
      handleToast("success", "Kho đã được thêm vào danh sách", "top-right");
      // Đóng hộp thoại sau khi thêm thành công
    },
  });
  const options = [
    { value: "pending", label: "Chờ xử lý" },
    { value: "in_progress", label: "Đang xử lý" },
    { value: "completed", label: "Hoàn thành" },
    { value: "canceled", label: "Đã hủy" },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên kho"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                {/* Address Field */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomDropdown
                    label="Trạng thái"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                    helperText={formik.touched.status && formik.errors.status}
                    options={options}
                  />
                </Grid>
                {/* Description Field */}
                <Grid item xs={12} md={12}>
                  <Textarea
                    label="Mô tả"
                    name="describe"
                    value={formik.values.describe}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.describe && Boolean(formik.errors.describe)
                    }
                    helperText={
                      formik.touched.describe && formik.errors.describe
                    }
                    height={300}
                  />
                </Grid>
              </Grid>
              {/* Submit Button */}
              <Box mt={3} textAlign="right">
                <Button variant="contained" type="submit" color="success">
                  Thêm kho
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => navigate("/dashboard/warehouse")}
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

export default AddWarehouse;
