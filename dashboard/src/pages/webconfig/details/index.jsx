/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import "./index.scss";
export default function DetailWeb({ open, handleClose, selectedData }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="company-details-dialog"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent className="dialog-content">
        {selectedData && (
          <Box className="image-container" sx={{ textAlign: "center" }}>
            <img
              src={
                selectedData?.logo ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={selectedData?.title || "No Image Available"}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Image+Not+Available";
              }}
              style={{ marginBottom: "20px" }} // Add margin below the image
            />

            <h2 id="company-details-dialog" className="dialog-title" style={{ fontSize: "24px", marginBottom: "20px" }}>
              {selectedData.title}
            </h2>

            <p className="dialog-text" style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Email:</strong> {selectedData.email}
            </p>
            <p className="dialog-text" style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>SDT:</strong> {selectedData.phone}
            </p>
            <p className="dialog-text" style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Địa chỉ:</strong> {selectedData.address}
            </p>

            <p className="dialog-text" style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Fanpage Facebook:</strong>{" "}
              <a
                href={selectedData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="dialog-link"
                style={{ color: "#3b5998" }} // Optional: add a color for Facebook link
              >
                {selectedData.facebook}
              </a>
            </p>

            <p className="dialog-text" style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Tiktok:</strong>{" "}
              <a
                href={selectedData.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="dialog-link"
                style={{ color: "#69c9d0" }} // Optional: add a color for TikTok link
              >
                {selectedData.tiktok}
              </a>
            </p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" className="dialog-button">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>


  );
}
