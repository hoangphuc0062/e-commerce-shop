import { Grid, Box, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
// import { PostSchema } from "../validate/post"; 
import { useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { PostSchema } from "../validate";

// Example options for staff and categories
const staffOptions = [
    { value: 1, label: "Person 1" },
    { value: 2, label: "Person 2" },
];
const categoryOptions = [
    { value: 1, label: "Category 1" },
    { value: 3, label: "Category 3" },
];
function AddPost() {
    const navigate = useNavigate();

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
        formik.setFieldValue("thumbnail", url);
    };

    const handleDelete = () => {
        formik.setFieldValue("thumbnail", "");
    };

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
    });
    const handleTitleChange = (e) => {
        const title = e.target.value;
        formik.setFieldValue("post_title", title);
        // Convert the title to slug
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        formik.setFieldValue("slug", slug);
    };
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
                                        fooder="post" // You can make it dynamic if needed
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    {/* Post Information Section */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Tiêu đề bài viết"
                                        name="post_title"
                                        value={formik.values.post_title}
                                        onChange={handleTitleChange} // Use the new function
                                        {...getErrorProps("post_title")}
                                        error={
                                            formik.touched.post_title && Boolean(formik.errors.post_title)
                                        }
                                        helperText={formik.touched.post_title && formik.errors.post_title}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Slug"
                                        name="slug"
                                        value={formik.values.slug}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("slug")}
                                        placeholder="Slug will be generated"
                                        disabled // Optional: Disable input if you want to prevent manual changes
                                        error={
                                            formik.touched.slug && Boolean(formik.errors.slug)
                                        }
                                        helperText={formik.touched.slug && formik.errors.slug}
                                    />
                                </Grid>
                                {/* staff Dropdown */}
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Nhân viên</InputLabel>
                                        <Select
                                            label="Nhân viên"
                                            name="staff"
                                            value={formik.values.staff}
                                            onChange={(event) => {
                                                const {
                                                    target: { value },
                                                } = event;
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

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Danh mục</InputLabel>
                                        <Select
                                            label="Danh mục"
                                            name="category"
                                            value={formik.values.category}
                                            onChange={(event) => {
                                                const {
                                                    target: { value },
                                                } = event;
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
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Từ khóa SEO"
                                        name="seoKeywords"
                                        value={formik.values.seoKeywords}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("seoKeywords")}
                                        error={
                                            formik.touched.seoKeywords && Boolean(formik.errors.seoKeywords)
                                        }
                                        helperText={formik.touched.seoKeywords && formik.errors.seoKeywords}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomInputField
                                        label="Mô tả SEO"
                                        name="metaDescription"
                                        value={formik.values.metaDescription}
                                        onChange={formik.handleChange}
                                        {...getErrorProps("metaDescription")}
                                        error={
                                            formik.touched.metaDescription && Boolean(formik.errors.metaDescription)
                                        }
                                        helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textarea
                                        label="Mô tả ngắn"
                                        name="shortDescription"
                                        value={formik.values.shortDescription}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.shortDescription && Boolean(formik.errors.shortDescription)
                                        }
                                        helperText={
                                            formik.touched.shortDescription && formik.errors.shortDescription
                                        }
                                        height={250}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textarea
                                        label="Nội dung bài viết"
                                        name="articleContent"
                                        value={formik.values.articleContent}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.articleContent && Boolean(formik.errors.articleContent)
                                        }
                                        helperText={
                                            formik.touched.articleContent && formik.errors.articleContent
                                        }
                                        height={300}
                                    />
                                </Grid>

                            </Grid>

                            {/* Submit and Cancel Buttons */}
                            <Box mt={3} textAlign="right">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    aria-label="Add Post"
                                >
                                    Thêm bài viết
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => navigate("/dashboard/post")}
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

export default AddPost;
