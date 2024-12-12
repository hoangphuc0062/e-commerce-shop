import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import UploadIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import propTypes from "prop-types";
import { imageDb } from "./../../config/firebase";

const ImageUploader = ({
  onUploadComplete,
  onDelete,
  buttonComponent: CustomButton,
  avatarSize = 120,
  error,
  helperText,
  allowedFormats = ["PNG", "JPG"],
  fooder,
  idupload,

  isFullWidth = false,
  isFullHeight = false,
  dataImage = [],
}) => {
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [imageRefs, setImageRefs] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  useEffect(() => {
    if (dataImage.length > 0) {
      setDownloadURLs(dataImage);
    }
  }, [dataImage]);
  // Handle file upload
  const handleFileUpload = useCallback(
    async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploadError(null);

      // Lọc các file không hợp lệ
      const invalidFiles = files.filter(
        (file) =>
          !["image/png", "image/jpeg"].includes(file.type) ||
          file.size > 5 * 1024 * 1024
      );

      if (invalidFiles.length > 0) {
        setUploadError(
          "Một số tệp không hợp lệ. Vui lòng chỉ tải lên hình ảnh PNG hoặc JPG với kích thước không quá 5MB."
        );
        return;
      }

      try {
        const urls = await Promise.all(
          files.map((file) => {
            const storageRef = ref(imageDb, `${fooder}/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                null,
                (error) => {
                  console.error("Upload failed:", error);
                  reject(error);
                },
                async () => {
                  try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setDownloadURLs((prevURLs) => [...prevURLs, url]);
                    setImageRefs((prevRefs) => [...prevRefs, storageRef]);
                    resolve(url);
                  } catch (err) {
                    reject(err);
                  }
                }
              );
            });
          })
        );

        // Gọi onUploadComplete với tất cả URL
        if (onUploadComplete) onUploadComplete(urls);

        console.log("All files uploaded successfully:", urls);
      } catch (err) {
        console.error("Error uploading files:", err);
        setUploadError("Có lỗi xảy ra trong quá trình tải lên.");
      }
    },
    [onUploadComplete, fooder]
  );

  const handleDelete = useCallback(
    (index) => {
      const imageRef = downloadURLs[index];
      if (onDelete) onDelete(imageRef);
      setDownloadURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    },
    [onDelete, downloadURLs]
  );

  return (
    <Box textAlign="center" p={3}>
      <input
        type="file"
        id={idupload || "uploadFile"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        multiple // Allow multiple file uploads
      />
      <label htmlFor={idupload || "uploadFile"}>
        <Box
          sx={{
            width: isFullWidth ? "100%" : " width: avatarSize + 30",
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
            >
              <UploadIcon fontSize="large" />
            </Avatar>
          </IconButton>
        </Box>
      </label>
      <Typography variant="body2" color="textSecondary" mt={2}>
        {`Hỗ trợ định dạng ${allowedFormats.join(", ")}`}{" "}
        {/* Dynamic formats */}
      </Typography>

      {/* Display error if present */}
      {(error || uploadError) && (
        <Typography variant="body2" color="error" mt={1}>
          {helperText || uploadError}
        </Typography>
      )}

      {/* Display all uploaded images */}
      {downloadURLs.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          {downloadURLs?.map((url, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: isFullWidth ? "100%" : avatarSize + 30, // xét điều kiện ở cha nếu thì
                height: isFullHeight ? "100%" : avatarSize + 30,
              }}
            >
              <Avatar
                src={url}
                sx={{
                  width: isFullWidth ? "100%" : avatarSize + 30, // xét điêuf kiệu nếu  thì
                  height: isFullHeight ? "100%" : avatarSize + 30,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
              {CustomButton ? (
                <CustomButton onClick={() => handleDelete(index)} />
              ) : (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "red",
                    color: "white",
                    width: 30,
                    height: 30,
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon sx={{ fontSize: 24 }} />
                </IconButton>
              )}
            </Box>
          ))}
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
  allowedFormats: propTypes.arrayOf(propTypes.string),
  fooder: propTypes.string.isRequired, // Required prop for dynamic folder path
  idupload: propTypes.string,
  dataImage: propTypes.arrayOf(propTypes.string),
};

export default ImageUploader;
