/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const ReusableForm = ({
  fields,
  onSubmit,
  initialValues,
  title,
  formStyles,
  fieldStyles,
  buttonStyles,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Paper sx={{ padding: 3, ...formStyles }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid
              item
              xs={field.xs || 12}
              sm={field.sm || 6}
              md={field.md || 6}
              lg={field.lg || 6}
              xl={field.xl || 6}
              key={field.name}
            >
              <TextField
                fullWidth
                name={field.name}
                label={field.label}
                value={formValues[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                type={field.type || "text"}
                sx={fieldStyles}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={buttonStyles}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ReusableForm;
