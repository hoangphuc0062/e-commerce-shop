import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";
import { imageDb } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  IconButton,
  Typography,
  LinearProgress,
  Avatar,
  Button,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import propTypes from "prop-types";

const ImageUploader = ({
  onUploadComplete,
  onDelete,
  buttonComponent: CustomButton,
  avatarSize = 120,
  error,
  helperText,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(imageDb, `uploads/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setImageRef(storageRef);
          setUploading(false);
          if (onUploadComplete) onUploadComplete(url);
        });
      }
    );
  };

  const handleDelete = () => {
    if (!imageRef) return;

    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully");
        setDownloadURL(null);
        setImageRef(null);
        if (onDelete) onDelete();
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  return (
    <Box textAlign="center" p={3}>
      <input
        type="file"
        id="uploadFile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <label htmlFor="uploadFile">
        <Box
          sx={{
            width: avatarSize + 30,
            height: avatarSize + 30,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          <IconButton component="span">
            <Avatar
              sx={{
                width: avatarSize,
                height: avatarSize,
                backgroundColor: "#d3d3d3",
                color: "#6c757d",
              }}
              src={downloadURL || ""}
            >
              {!downloadURL && <UploadIcon fontSize="large" />}{" "}
            </Avatar>
          </IconButton>
        </Box>
      </label>
      <Typography variant="body2" color="textSecondary" mt={2}>
        Cho phép PNG, JPG, SVG, WEBP và GIF.
      </Typography>

      {uploading && (
        <Box mt={2} width="100%" maxWidth={300} mx="auto">
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" mt={1}>
            Đang tải lên: {progress.toFixed(0)}%
          </Typography>
        </Box>
      )}
      {error && (
        <Typography variant="body2" color="error" mt={1}>
          {helperText}
        </Typography>
      )}
      {downloadURL && (
        <Box mt={4}>
          {CustomButton ? (
            <CustomButton onClick={handleDelete} />
          ) : (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Xóa ảnh
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

ImageUploader.propTypes = {
  onUploadComplete: propTypes.func,
  onDelete: propTypes.func,
  buttonComponent: propTypes.elementType,
  avatarSize: propTypes.number,
  error: propTypes.bool,
  helperText: propTypes.string,
};
export default ImageUploader;
