import {
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Specifications({
  productDetails,
  setProductDetails,
  dataSpecifications,
}) {
  const addSpecification = () => {
    setProductDetails({
      ...productDetails,
      Specifications: [
        ...productDetails.Specifications,
        { NameTT: "", ValueTT: "", TypeTT: "" },
      ],
    });
  };

  const removeSpecification = (index) => {
    const newSpecifications = productDetails.Specifications.filter(
      (_, i) => i !== index
    );
    setProductDetails({ ...productDetails, Specifications: newSpecifications });
  };

  const handleSpecificationChange = (index, key, value) => {
    const newSpecifications = [...productDetails.Specifications];
    newSpecifications[index][key] = value;
    setProductDetails({ ...productDetails, Specifications: newSpecifications });
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: 5, mt: 4 }}>
        <Typography
          sx={{
            marginBottom: 2,
          }}
          variant="h6"
        >
          Thông số kỹ thuật
        </Typography>
        {productDetails.Specifications.map((spec, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            {/* Select for NameTT */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Tên thuộc tính</InputLabel>
                <Select
                  value={spec.NameTT}
                  onChange={(e) =>
                    handleSpecificationChange(index, "NameTT", e.target.value)
                  }
                >
                  {dataSpecifications.NameTT.map((name, i) => (
                    <MenuItem key={i} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Select for ValueTT */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Giá trị</InputLabel>
                <Select
                  value={spec.ValueTT}
                  onChange={(e) =>
                    handleSpecificationChange(index, "ValueTT", e.target.value)
                  }
                >
                  {dataSpecifications.ValueTT[spec.NameTT]?.map((value, i) => (
                    <MenuItem key={i} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Select for TypeTT */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Loại thuộc tính</InputLabel>
                <Select
                  value={spec.TypeTT}
                  onChange={(e) =>
                    handleSpecificationChange(index, "TypeTT", e.target.value)
                  }
                >
                  {dataSpecifications.TypeTT.map((type, i) => (
                    <MenuItem key={i} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Delete Button */}
            <Grid item xs={12} sm={1}>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => removeSpecification(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={addSpecification}>
            Thêm Thông Số
          </Button>
        </Grid>
      </Paper>
    </>
  );
}
