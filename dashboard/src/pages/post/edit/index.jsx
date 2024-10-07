import { Grid, Box, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { PostSchema } from "../validate";
import { useEffect, useState } from "react";

// Example options for staff and categories
const staffOptions = [
    { value: 1, label: "Person 1" },
    { value: 2, label: "Person 2" },
];
const categoryOptions = [
    { value: 1, label: "Category 1" },
    { value: 3, label: "Category 3" },
];

function EditPost({ fetchPostData }) {
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming post ID is passed via URL
    const [loading, setLoading] = useState(true);

    // Fetch post data by ID
    useEffect(() => {
        async function fetchData() {
            try {
                const postData = await fetchPostData(id); // Replace with actual data fetching logic
                formik.setValues(postData);
            } catch (error) {
                console.error("Error fetching post data:", error);
                handleToast("error", "Không thể tải dữ liệu bài viết", "top-right");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            post_title: "",
            slug: "",
            thumbnail: "",
            shortDescription: "",
            seoKeywords: "",
            metaDescription: "",
            shortSeoDescription: "",
            articleContent: "",
            staff: [],
            category: [],
            statustPost: "draft",
        },
        validationSchema: PostSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                // API call to update the post
                await handleToast("success", "Bài viết đã được cập nhật", "top-right");
                console.log("Form updated", values);
                navigate("/dashboard/post"); // Redirect after successful update
            } catch (error) {
                console.error("Error during form submission", error);
                handleToast("error", "Cập nhật bài viết thất bại", "top-right");
            }
        },
    });

    const handleUploadComplete = (url) => {
        formik.setFieldValue("thumbnail", url);
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
            formik.setFieldValue("thumbnail", "");
        }
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        formik.setFieldValue("post_title", title);
        if (!formik.touched.slug) {
            const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
            formik.setFieldValue("slug", slug);
        }
    };

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name] ? formik.errors[name] : "",
    });

    const handleCancel = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy những thay đổi này không?")) {
            navigate("/dashboard/post");
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
                    {/* Thumbnail Upload Section */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Box textAlign="center" mb={2}>
                                <Typography variant="h6">Ảnh bìa bài viết</Typography>
                                <Box>
                                    <ImageUploader
                                        onUploadComplete={handleUploadComplete}
                                        onDelete={handleDelete}
                                        avatarSize={100}
                                        {...getErrorProps("thumbnail")}
                                        onBlur={formik.handleBlur}
                                        fooder="post"
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Post Information Section */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                {/* Title Field */}
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Tiêu đề bài viết"
                                        name="post_title"
                                        value={formik.values.post_title}
                                        onChange={handleTitleChange}
                                        {...getErrorProps("post_title")}
                                    />
                                </Grid>

                                {/* Slug Field */}
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Slug"
                                        name="slug"
                                        value={formik.values.slug}
                                        onChange={formik.handleChange}
                                        disabled
                                        {...getErrorProps("slug")}
                                    />
                                </Grid>

                                {/* Staff Dropdown */}
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Nhân viên</InputLabel>
                                        <Select
                                            label="Nhân viên"
                                            name="staff"
                                            value={formik.values.staff}
                                            onChange={(event) => {
                                                const { target: { value } } = event;
                                                formik.setFieldValue("staff", typeof value === 'string' ? value.split(',') : value);
                                            }}
                                            error={formik.touched.staff && Boolean(formik.errors.staff)}
                                            multiple
                                        >
                                            {staffOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.staff && formik.errors.staff && (
                                            <FormHelperText error>{formik.errors.staff}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Category Dropdown */}
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Danh mục</InputLabel>
                                        <Select
                                            label="Danh mục"
                                            name="category"
                                            value={formik.values.category}
                                            onChange={(event) => {
                                                const { target: { value } } = event;
                                                formik.setFieldValue("category", typeof value === 'string' ? value.split(',') : value);
                                            }}
                                            error={formik.touched.category && Boolean(formik.errors.category)}
                                            multiple
                                        >
                                            {categoryOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.category && formik.errors.category && (
                                            <FormHelperText error>{formik.errors.category}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Short Description */}
                                <Grid item xs={12}>
                                    <Textarea
                                        label="Mô tả ngắn"
                                        name="shortDescription"
                                        value={formik.values.shortDescription}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("shortDescription")}
                                        height={250}
                                    />
                                </Grid>

                                {/* Article Content */}
                                <Grid item xs={12}>
                                    <Textarea
                                        label="Nội dung bài viết"
                                        name="articleContent"
                                        value={formik.values.articleContent}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("articleContent")}
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit and Cancel Buttons */}
                            <Box mt={3} textAlign="right">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    aria-label="Update Post"
                                >
                                    Cập nhật bài viết
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

export default EditPost;
