import { Paper, Box } from "@mui/material";
import ImageUploader from "../../../components/upload";

export default function ProductImages({ productDetails, setProductDetails }) {
  const handleImageChange = (images) => {
    setProductDetails({ ...productDetails, images });
  };

  const handleImageDelete = (index) => {
    const newImages = productDetails.images.filter((_, i) => i !== index);
    setProductDetails({ ...productDetails, images: newImages });
  };

  const handleImageReorder = (images) => {
    setProductDetails({ ...productDetails, images });
  };

  const handleImageUploadError = (error) => {};

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <ImageUploader
          images={productDetails.images}
          onUpload={handleImageChange}
          onDelete={handleImageDelete}
          onReorder={handleImageReorder}
          onError={handleImageUploadError}
          fooder="product"
        />
      </Paper>
    </Box>
  );
}
