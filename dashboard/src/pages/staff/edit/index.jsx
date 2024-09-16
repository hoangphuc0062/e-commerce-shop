import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  IconButton,
  Grid,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import CakeIcon from "@mui/icons-material/Cake";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { StatusChip } from "../../../components/StatusColor";
import { StaffSchema } from "../validade/create";
import CustomInputField from "../../../components/InputField";

// Mock Avatar image (replace with the actual image or icon as needed)
const avatarUrl = "https://i.pravatar.cc/150?img=3";

export default function EyeStaffEdit({
  open,
  handleClose,
  selectedData,
  handleDelete,
  handleSave,
}) {
  const statusColors = {
    active: { label: "Active", color: "success" },
    inactive: { label: "Inactive", color: "error" },
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Formik
        initialValues={selectedData || {}}
        validationSchema={StaffSchema}
        onSubmit={(values) => {
          handleSave(values);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          touched,
          errors,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                {/* Delete Icon */}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(selectedData.id)}
                >
                  <Delete color="error" />
                </IconButton>
              </Box>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                {/* Avatar */}
                <Avatar
                  src={avatarUrl}
                  alt="Profile Image"
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    margin: "0 auto",
                    mb: 2,
                  }}
                />
                {/* <CustomInputField
                  name="avatar"
                  type="file"
                  label="Avatar"
                  accept="image/*"
                  sx={{ display: "block", margin: "0 auto" }}
                /> */}
                <CustomInputField
                  name="name"
                  label="Họ và tên"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <CakeIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="startDate"
                    label="Ngày bắt đầu"
                    type="date"
                    variant="outlined"
                    value={values.startDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    helperText={touched.startDate && errors.startDate}
                    error={touched.startDate && Boolean(errors.startDate)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <RateReviewIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="commission"
                    label="Tỉ lệ hoa hồng"
                    variant="outlined"
                    value={values.commission}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.commission && errors.commission}
                    error={touched.commission && Boolean(errors.commission)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <BusinessIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="department"
                    label="Phòng ban"
                    variant="outlined"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.department && errors.department}
                    error={touched.department && Boolean(errors.department)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <EmailIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <LocationOnIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="base"
                    label="Cơ sở"
                    variant="outlined"
                    value={values.base}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.base && errors.base}
                    error={touched.base && Boolean(errors.base)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <PriceCheckIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="fixedSalary"
                    label="Lương cố định"
                    variant="outlined"
                    value={values.fixedSalary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.fixedSalary && errors.fixedSalary}
                    error={touched.fixedSalary && Boolean(errors.fixedSalary)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <AttachMoneyIcon sx={{ marginRight: 1 }} />
                  <CustomInputField
                    fullWidth
                    name="totalSalary"
                    label="Tổng lương"
                    variant="outlined"
                    value={values.totalSalary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.totalSalary && errors.totalSalary}
                    error={touched.totalSalary && Boolean(errors.totalSalary)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                  <CustomInputField
                    select
                    fullWidth
                    name="status"
                    label="Trạng thái"
                    variant="outlined"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.status && errors.status}
                    error={touched.status && Boolean(errors.status)}
                  >
                    {Object.keys(statusColors).map((status) => (
                      <MenuItem key={status} value={status}>
                        <StatusChip status={status} />
                      </MenuItem>
                    ))}
                  </CustomInputField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Hủy bỏ
              </Button>
              <Button type="submit" color="primary">
                Lưu
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

EyeStaffEdit.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  selectedData: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSave: PropTypes.func,
};
