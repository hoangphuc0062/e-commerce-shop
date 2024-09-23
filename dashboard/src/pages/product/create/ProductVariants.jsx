import {
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductVariants({
  productDetails,
  setProductDetails,
  dataVariants,
}) {
  const addVariantOption = () => {
    setProductDetails({
      ...productDetails,
      variants: [...productDetails.variants, { type: "", value: "" }],
    });
  };

  const removeVariantOption = (index) => {
    const newVariants = productDetails.variants.filter((_, i) => i !== index);
    setProductDetails({ ...productDetails, variants: newVariants });
  };

  const handleVariantChange = (index, key, value) => {
    const newVariants = [...productDetails.variants];
    newVariants[index][key] = value;
    setProductDetails({ ...productDetails, variants: newVariants });
  };

  return (
    <Paper elevation={3} sx={{ padding: 5, mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Các biến thể sản phẩm</Typography>
        </Grid>
        {productDetails.variants.map((variant, index) => (
          <Grid container item spacing={2} key={index} alignItems="center">
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Chọn biến thể</InputLabel>
                <Select
                  value={variant.type}
                  onChange={(e) =>
                    handleVariantChange(index, "type", e.target.value)
                  }
                >
                  {dataVariants.type.map((variantType, index) => (
                    <MenuItem key={index} value={variantType}>
                      {variantType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Giá trị biến thể</InputLabel>
                <Select
                  value={variant.value}
                  onChange={(e) =>
                    handleVariantChange(index, "value", e.target.value)
                  }
                >
                  {dataVariants.value[variant.type]?.map((valueOption, i) => (
                    <MenuItem key={i} value={valueOption}>
                      {valueOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => removeVariantOption(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="caption">
            Biến thể là các thuộc tính của sản phẩm như màu sắc, kích thước,...
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={addVariantOption}>
            Thêm biến thể
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
