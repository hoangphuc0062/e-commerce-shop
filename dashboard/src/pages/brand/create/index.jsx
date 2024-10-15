import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import ImageUploader from "../../../components/upload";
import Textarea from "../../../components/textarea";
import CustomDropdown from "../../../components/Dropdown";
export default function BrandFrom({
  title,
  onSubmit,
  initialValues,
  validationSchema,
  isUpdate,
}) {
  return (
    <>
      <Card>
        <CardHeader title="Thêm thương hiệu" />
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ImageUploader />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Tên thương hiệu"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Slug" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <CustomDropdown />
              </Grid>
              <Grid item xs={12}>
                <Textarea />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
