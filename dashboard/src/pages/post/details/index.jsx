import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
// thư viện he Giải mã các ký tự HTML như &acirc; và &agrave; thành "â" và "à
import he from "he";
import Comment from "./Comment";

export default function EyePost({
  open,
  handleClose,
  selectedData,
  handleDeleteRating
}) {
  const truncateContent = (content, maxLength) => {
    if (!content) return "";

    // Giải mã các ký tự HTML, loại bỏ &nbsp; và các thẻ HTML
    const plainTextContent = he
      .decode(content.replace(/&nbsp;/g, " "))
      .replace(/<[^>]*>/g, "");

    // Rút ngắn nội dung nếu vượt quá độ dài tối đa
    return plainTextContent.length > maxLength
      ? plainTextContent.slice(0, maxLength) + "..."
      : plainTextContent;
  };

  const removePTags = (text) => {
    return text ? text.replace(/<\/?p>/g, "") : "";
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{ padding: 4, maxHeight: "80vh", overflowY: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Avatar
            src={selectedData.thumbnail}
            alt="Thumbnail"
            variant="square" // Đảm bảo Avatar không bo tròn
            sx={{
              width: { xs: 400, md: 600 }, // Chiều rộng lớn hơn
              height: { xs: 200, md: 300 }, // Chiều cao nhỏ hơn
              margin: "0 auto",
              mb: 2,
            }}
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {selectedData?.post_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {removePTags(selectedData?.shortDescription)}
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
              <strong>Đánh giá:</strong>
              {selectedData?.rating?.map((el) => (
                <Comment
                  key={el._id}
                  star={el.star}
                  comment={el.comment}
                  name={el.customer?.name}
                  avatar={el.customer?.avatar}
                  onDelete={() => handleDeleteRating(el._id)}
                />
              ))}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          sx={{ marginLeft: 2 }}
        >
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
  handleDeleteRating: PropTypes.func.isRequired,
};
