/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { FieldArray } from "formik";

const SubcategoryDialog = ({
  open,
  handleClose,
  categoryIndex,
  values,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <FieldArray name={`categories[${categoryIndex}].subcategories`}>
          {({ push, remove }) => (
            <Box>
              <Typography variant="h6">Enter Subcategories</Typography>
              {values.categories[categoryIndex].subcategories.map(
                (subcategory, subIndex) => (
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={subIndex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        name={`categories[${categoryIndex}].subcategories[${subIndex}].name`}
                        label={`Subcategory ${subIndex + 1}`}
                        fullWidth
                        value={subcategory.name}
                        onChange={handleChange}
                        error={
                          touched.categories &&
                          touched.categories[categoryIndex] &&
                          touched.categories[categoryIndex].subcategories &&
                          touched.categories[categoryIndex].subcategories[
                            subIndex
                          ] &&
                          Boolean(
                            errors.categories?.[categoryIndex]?.subcategories?.[
                              subIndex
                            ]?.name
                          )
                        }
                        helperText={
                          touched.categories &&
                          touched.categories[categoryIndex] &&
                          touched.categories[categoryIndex].subcategories &&
                          touched.categories[categoryIndex].subcategories[
                            subIndex
                          ] &&
                          errors.categories?.[categoryIndex]?.subcategories?.[
                            subIndex
                          ]?.name
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => remove(subIndex)}>
                        <RemoveCircle color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              )}
              <Button
                variant="outlined"
                onClick={() => push({ name: "" })}
                startIcon={<AddCircle />}
                sx={{ mt: 2, borderColor: "#1976d2", color: "#1976d2" }}
              >
                Add Subcategory
              </Button>
            </Box>
          )}
        </FieldArray>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubcategoryDialog;
