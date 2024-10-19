import React from 'react';
import { Grid, Box, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../components/upload";
import { BannerSchema } from '../validate/bannerConllection';
import { handleToast } from '../../../utils/toast';


const collectionOptions = [
    { value: 1, label: "Collection 1" },
    { value: 2, label: "Collection 2" },
];
const collectionStatus = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'pending', label: 'Đang chờ' },
    { value: 'archived', label: 'Lưu trữ' },
];
function AddBannerCollection() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            collection: "",
            image: "",
            status: "active",
            priority: "1", // Đảm bảo đây là chuỗi
            startDate: "", // Thiết lập thành chuỗi rỗng thay vì null
            endDate: "",   // Thiết lập thành chuỗi rỗng thay vì null
        },
        validationSchema: BannerSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, { resetForm }) => {
            try {
                handleToast("success", "Bài viết đã được thêm", "top-right");
                console.log("Form submitted", values);
                resetForm();
            } catch (error) {
                console.error("Error during form submission", error);
            }
        },
    });

    const handleUploadComplete = (url) => {
        formik.setFieldValue("image", url);
    };

    const handleDelete = () => {
        formik.setFieldValue("image", "");
    };

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box p={3}>
                <Grid container spacing={3}>
                    {/* Image Upload Section */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Box textAlign="center" mb={2}>
                                <Typography variant="h6">Ảnh bìa bộ sưu tập</Typography>
                                <Box>
                                    <ImageUploader
                                        onUploadComplete={handleUploadComplete}
                                        onDelete={handleDelete}
                                        avatarSize={100}
                                        {...getErrorProps("image")}
                                        onBlur={formik.handleBlur}
                                        fooder="banner"
                                    />
                                </Box>
                                {formik.touched.image && formik.errors.image && (
                                    <FormHelperText error>{formik.errors.image}</FormHelperText>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                    {/* Banner Information Section */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Tên banner"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("name")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Bộ sưu tập</InputLabel>
                                        <Select
                                            label="Bộ sưu tập"
                                            name="collection"
                                            value={formik.values.collection}
                                            onChange={formik.handleChange}
                                            error={formik.touched.collection && Boolean(formik.errors.collection)}
                                        >
                                            {collectionOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.collection && formik.errors.collection && (
                                            <FormHelperText error>{formik.errors.collection}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Mức độ ưu tiên"
                                        name="priority"
                                        type="number"
                                        value={formik.values.priority}
                                        onChange={(e) => formik.setFieldValue("priority", String(e.target.value))}
                                        {...getErrorProps("priority")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Trạng thái</InputLabel>
                                        <Select
                                            label="Trạng thái"
                                            name="status"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                        >
                                            {collectionStatus.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.status && formik.errors.status && (
                                            <FormHelperText error>{formik.errors.status}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Ngày Bắt Đầu"
                                        name="startDate"
                                        type="date"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        {...getErrorProps("startDate")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Ngày Kết Thúc"
                                        name="endDate"
                                        type="date"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        {...getErrorProps("endDate")}
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit and Cancel Buttons */}
                            <Box mt={3} textAlign="right">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    aria-label="Add Banner"
                                >
                                    Thêm bộ sưu tập banner
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => navigate("/dashboard/bannercollection")}
                                    style={{ marginLeft: 10 }}
                                    aria-label="Cancel"
                                >
                                    Hủy
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}

export default AddBannerCollection;
