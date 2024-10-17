/* eslint-disable react/prop-types */
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function VariantForm({
  open,
  handleClose,
  variantData,
  handleVariantChange,
  handleSubmit,
}) {
  return (
    <>
      {/* Dialog for form */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Nhập biến thể sản phẩm</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên biến thể"
                  value={variantData.name}
                  onChange={(e) => handleVariantChange("name", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá trị"
                  value={variantData.type}
                  onChange={(e) => handleVariantChange("type", e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu biến thể
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
