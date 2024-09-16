import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Paper, Button, TextField } from '@mui/material';
import { handleToast } from "../../../utils/toast";


function AddWarehouse() {
    // Formik configuration
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            describe: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên kho là bắt buộc'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            describe: Yup.string().required('Mô tả là bắt buộc'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            // Handle form submission, e.g., send data to an API
            handleToast("success", "Kho đã được thêm vào danh sách", "top-right");
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                {/* Name Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Tên kho"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>
                                {/* Address Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </Grid>
                                {/* Description Field */}
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label="Mô tả"
                                        name="describe"
                                        value={formik.values.describe}
                                        onChange={formik.handleChange}
                                        error={formik.touched.describe && Boolean(formik.errors.describe)}
                                        helperText={formik.touched.describe && formik.errors.describe}
                                    />
                                </Grid>
                            </Grid>
                            {/* Submit Button */}
                            <Box mt={3} textAlign="right">
                                <Button variant="contained" type="submit" color="success">
                                    Thêm kho
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}

export default AddWarehouse;
