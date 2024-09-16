import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import propTypes from "prop-types";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { StatusChip } from "../../../components/StatusColor";

// Mock Avatar image (replace with the actual image or icon as needed)
const avatarUrl = "https://i.pravatar.cc/150?img=3";

export default function EyeStaff({
  open,
  handleClose,
  selectedData,
  handleDelete,
  handleEdit,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* Edit and Options Icons */}
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(selectedData.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="more options"
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
          <Typography variant="h6" fontWeight="bold">
            {selectedData?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {selectedData?.role}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <CakeIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.startDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <RateReviewIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.commission}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <BusinessIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.department}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <EmailIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.base}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <PriceCheckIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.fixedSalary}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <AttachMoneyIcon sx={{ marginRight: 1 }} />
            <Typography>{selectedData?.totalSalary}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            {selectedData?.status && (
              <StatusChip status={selectedData?.status} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EyeStaff.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  selectedData: propTypes.object,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  getStatusColor: propTypes.func,
};
