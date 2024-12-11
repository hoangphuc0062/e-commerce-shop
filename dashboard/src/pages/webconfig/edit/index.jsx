import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import propTypes from "prop-types";
import { WebconFigValidate } from "../validate/WebConFigSchema";
import ImageUploader from "../../../components/upload";

const EditWebConfigDialog = ({ open, onClose, initialValues, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      address: initialValues?.address || "",
      logo: initialValues?.logo || "",
      logoMobie: initialValues?.logoMobie || "",
      facebook: initialValues?.facebook || "",
      tiktok: initialValues?.tiktok || "",
    },
    validationSchema: WebconFigValidate,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      onSave(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ paddingBottom: "24px" }}>
            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Tên công ty"
                fullWidth
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Địa chỉ"
                fullWidth
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Facebook"
                fullWidth
                name="facebook"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
                helperText={formik.touched.facebook && formik.errors.facebook}
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="TikTok"
                fullWidth
                name="tiktok"
                value={formik.values.tiktok}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tiktok && Boolean(formik.errors.tiktok)}
                helperText={formik.touched.tiktok && formik.errors.tiktok}
                style={{ marginBottom: "16px" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {/* Image Uploader for logoMobie */}
            <div style={{ flex: 1, marginRight: "16px" }}>
              <ImageUploader
                onUploadComplete={(url) => {
                  formik.setFieldValue("logoMobie", url[0]);
                }}
                imageUrl={formik.values.logoMobie}
                fooder="Ảnh đại diện Mobie"
                idupload="webconfig-logo-mobie"
                dataImage={
                  formik.values.logoMobie ? [formik.values.logoMobie] : []
                }
                sx={{ width: "100%", height: "auto" }}
              />
            </div>

            {/* Image Uploader for logo */}
            <div style={{ flex: 1 }}>
              <ImageUploader
                onUploadComplete={(url) => {
                  formik.setFieldValue("logo", url[0]);
                }}
                imageUrl={formik.values.logo}
                fooder="Ảnh đại diện Logo"
                idupload="webconfig"
                dataImage={formik.values.logo ? [formik.values.logo] : []}
                sx={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="error">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditWebConfigDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  initialValues: propTypes.object.isRequired,
  onSave: propTypes.func.isRequired,
};

export default EditWebConfigDialog;
