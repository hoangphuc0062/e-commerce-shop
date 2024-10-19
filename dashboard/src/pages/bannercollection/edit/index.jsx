import React, { useEffect, useState } from "react";
import {
    Grid,
    Box,
    Typography,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    FormHelperText,
    TextField
} from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import ImageUploader from "../../../components/upload";
// import { BannerSchema } from '../validate/bannerCollection';
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import { BannerSchema } from "../validate/bannerConllection";

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
function EditBannerCollection({ fetchBannerData }) {
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming the banner ID is passed via URL
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            name: "",
            collection: "",
            image: "",
            status: "active",
            priority: "1",
            startDate: "",
            endDate: "",
        },
        validationSchema: BannerSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                // API call to update the banner collection
                await handleToast("success", "Bộ sưu tập đã được cập nhật", "top-right");
                console.log("Form updated", values);
                navigate("/dashboard/bannercollection"); // Redirect after successful update
            } catch (error) {
                console.error("Error during form submission", error);
                handleToast("error", "Cập nhật bộ sưu tập thất bại", "top-right");
            }
        },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const bannerData = await fetchBannerData(id); // Replace with actual data fetching logic
                formik.setValues(bannerData);
            } catch (error) {
                console.error("Error fetching banner data:", error);
                handleToast("error", "Không thể tải dữ liệu bộ sưu tập", "top-right");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleUploadComplete = (url) => {
        formik.setFieldValue("image", url);
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
            formik.setFieldValue("image", "");
        }
    };

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
    });

    const handleCancel = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy những thay đổi này không?")) {
            navigate("/dashboard/bannercollection");
        }
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress />
                <Typography mt={2}>Đang tải dữ liệu...</Typography>
            </Box>
        );
    }

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
                                        InputLabelProps={{ shrink: true }}
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
                                        InputLabelProps={{ shrink: true }}
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
                                    aria-label="Update Banner"
                                >
                                    Cập nhật bộ sưu tập banner
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancel}
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

export default EditBannerCollection;
