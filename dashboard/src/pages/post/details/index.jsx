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
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

export default function EyePost({
  open,
  handleClose,
  selectedData,
  handleDelete,
  handleEdit,
}) {
  // const truncateContent = (content, maxLength) => {
  //   if (!content) return "";
  //   return content.length > maxLength
  //     ? content.slice(0, maxLength) + "..."
  //     : content;
  // };
  const truncateContent = (content, maxLength) => {
    if (!content) return "";

    // Loại bỏ các thẻ HTML bằng cách sử dụng regex
    const plainTextContent = content.replace(/<[^>]*>/g, '');

    // Rút ngắn nội dung nếu vượt quá độ dài tối đa
    return plainTextContent.length > maxLength
      ? plainTextContent.slice(0, maxLength) + "..."
      : plainTextContent;
  };
  const removePTags = (text) => {
    return text ? text.replace(/<\/?p>/g, '') : '';
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{
        padding: 4,
        maxHeight: "80vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9", // Background color for better contrast
        borderRadius: "8px", // Rounded corners
        boxShadow: 3, // Add some shadow for depth
      }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={selectedData.thumbnail}
            alt="Thumbnail"
            sx={{
              width: { xs: 100, md: 150 }, // Adjusted width
              height: { xs: 100, md: 150 }, // Adjusted height
              margin: "0 auto",
              mb: 2,
              border: "2px solid #007BFF", // Border to highlight avatar
            }}
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {selectedData?.post_title}
          </Typography>
          <Typography variant="body1">
            {/* <strong>Short SEO Description:</strong>{" "} */}
            {removePTags(selectedData?.postShortDescription)}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Tác giả:</strong> {selectedData?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>SEO Keywords:</strong> {selectedData?.seoKeywords}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Meta Description:</strong> {selectedData?.metaDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Short SEO Description:</strong>{" "}
              {removePTags(selectedData?.postShortDescription)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Nội dung bài viết:</strong>{" "}
              {truncateContent(selectedData?.content, 300)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Danh mục:</strong> {selectedData?.category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Trạng thái:</strong> {selectedData?.statustPost}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Đánh giá:</strong> {selectedData?.rating}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: 'center' }}>
        <IconButton
          aria-label="edit"
          onClick={() => handleEdit(selectedData.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(selectedData.id)}
        >
          <Delete color="error" />
        </IconButton>
        <Button onClick={handleClose} color="primary" variant="contained" sx={{ marginLeft: 2 }}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>

  );
}

EyePost.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedData: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
