import {
  Button,
  TextField,
  Box,
  IconButton,
  Grid,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import { Formik, FieldArray, Form } from "formik";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

import { useState } from "react";
import { CategorySchema } from "../validade/CategorySchema";
import SubcategoryDialog from "./Subcategory";

const AddCategory = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

  const handleOpenDialog = (index) => {
    setActiveCategoryIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveCategoryIndex(null);
  };

  return (
    <Formik
      initialValues={{
        categories: [{ name: "", hasSubcategories: false, subcategories: [] }],
      }}
      validationSchema={CategorySchema}
      onSubmit={(values) => {
        const sanitizedValues = values.categories.map((category) => ({
          ...category,
          subcategories: category.hasSubcategories
            ? category.subcategories
            : [],
        }));
        console.log("Submitted values:", sanitizedValues);
      }}
    >
      {({ values, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <Typography variant="h4" gutterBottom>
            Add Categories and Subcategories
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <FieldArray name="categories">
            {({ push, remove }) => (
              <Box>
                {values.categories.map((category, index) => (
                  <Box key={index} mb={6}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={8}>
                        <TextField
                          name={`categories[${index}].name`}
                          label="Category Name"
                          fullWidth
                          value={category.name}
                          onChange={handleChange}
                          error={
                            touched.categories &&
                            touched.categories[index] &&
                            touched.categories[index].name &&
                            Boolean(errors.categories?.[index]?.name)
                          }
                          helperText={
                            touched.categories &&
                            touched.categories[index] &&
                            touched.categories[index].name &&
                            errors.categories?.[index]?.name
                          }
                          InputLabelProps={{
                            sx: { fontSize: "1.2rem" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Checkbox
                          checked={category.hasSubcategories}
                          onChange={() => {
                            setFieldValue(
                              `categories[${index}].hasSubcategories`,
                              !category.hasSubcategories
                            );
                            if (!category.hasSubcategories) {
                              handleOpenDialog(index);
                            }
                          }}
                          color="primary"
                        />
                        <Typography variant="body2">
                          Has Subcategories?
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => remove(index)}
                          sx={{ color: "red" }}
                        >
                          <RemoveCircle />
                        </IconButton>
                      </Grid>
                    </Grid>

                    {category.hasSubcategories && (
                      <SubcategoryDialog
                        open={openDialog && activeCategoryIndex === index}
                        handleClose={handleCloseDialog}
                        categoryIndex={index}
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={() =>
                    push({
                      name: "",
                      hasSubcategories: false,
                      subcategories: [],
                    })
                  }
                  startIcon={<AddCircle />}
                  sx={{ mb: 2, borderColor: "#1976d2", color: "#1976d2" }}
                >
                  Add Category
                </Button>
              </Box>
            )}
          </FieldArray>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            Save Categories
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategory;
