/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import propTypes from "prop-types";
const DeleteCategoryDialog = ({ open, onClose, Namedelete, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn xóa "{Namedelete || ""}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" color="error" onClick={onDelete}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
DeleteCategoryDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  Namedelete: propTypes.string,
  onDelete: propTypes.func.isRequired,
};

export default DeleteCategoryDialog;
