/* eslint-disable no-useless-escape */
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
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast";
import ImageUploader from "../../../components/upload";
import { PostSchema } from "../validate";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/slices/category";
import { useEffect, useState } from "react";
import { createPost, resetState } from "../../../redux/slices/post";
import { getAllTags } from "../../../redux/slices/tags";

function AddPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);

  const category = useSelector((state) => state.category.data?.categories || []);
  const statusCategory = useSelector((state) => state.category.status);
  const tags = useSelector((state) => state.tag.data?.tags || []);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (statusCategory === "success" && category) {
      setCategoryOptions(
        category.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    } else if (statusCategory === "failed") {
      console.log("Failed to fetch category");
    }
    dispatch(resetState({ key: "getcategoryStatus", value: "idle" }));
  }, [statusCategory, category, dispatch]);

  useEffect(() => {
    if (tags) {
      setTagsOptions(
        tags.map((tag) => ({
          label: tag.name,
          value: tag._id,
        }))
      );
    }
  }, [tags]);

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      slug: "",
      thumbnail: "",
      shortDescription: "",
      seoKeyWords: "",
      metaDescription: "",
      shortSeoDescription: "",
      content: "",
      category: "",
      status: "draft",
      tags: [],
    },
    validationSchema: PostSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      dispatch(createPost(values)).then((res) => {
        if (res.type === "post/createPost/fulfilled") {
          handleToast("success", "Thêm bài viết thành công");
          resetForm();
          navigate("/dashboard/post");
        } else {
          handleToast("error", "Có lỗi xảy ra, vui lòng thử lại");
        }
      });
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
    formik.setFieldValue("postTitle", title);
    // Convert the title to slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
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
                    name="postTitle"
                    value={formik.values.postTitle}
                    onChange={handleTitleChange} // Use the new function
                    {...getErrorProps("postTitle")}
                    error={
                      formik.touched.postTitle &&
                      Boolean(formik.errors.postTitle)
                    }
                    helperText={
                      formik.touched.postTitle && formik.errors.postTitle
                    }
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
                    disabled
                    error={formik.touched.slug && Boolean(formik.errors.slug)}
                    helperText={formik.touched.slug && formik.errors.slug}
                  />
                </Grid>

                {/* Category Select */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                      label="Danh mục"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.category &&
                        Boolean(formik.errors.category)
                      }
                      onBlur={formik.handleBlur}
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error>
                        {formik.errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* Tags Select with Autocomplete */}
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    multiple
                    options={tagsOptions}
                    getOptionLabel={(option) => option.label}
                    value={tagsOptions.filter(tag => formik.values.tags.includes(tag.value))}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("tags", newValue.map((item) => item.value));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="Chọn thẻ"
                        error={formik.touched.tags && Boolean(formik.errors.tags)}
                        helperText={formik.touched.tags && formik.errors.tags}
                      />
                    )}
                  />
                </Grid>

                {/* SEO Fields */}
                <Grid item xs={12} md={6}>
                  <CustomInputField
                    label="Từ khóa SEO"
                    name="seoKeyWords"
                    value={formik.values.seoKeyWords}
                    onChange={formik.handleChange}
                    {...getErrorProps("seoKeyWords")}
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
                      formik.touched.metaDescription &&
                      Boolean(formik.errors.metaDescription)
                    }
                    helperText={
                      formik.touched.metaDescription &&
                      formik.errors.metaDescription
                    }
                  />
                </Grid>

                {/* Short Description */}
                <Grid item xs={12}>
                  <Textarea
                    label="Mô tả ngắn"
                    name="shortDescription"
                    value={formik.values.shortDescription || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                    errorMessage={formik.errors.shortDescription}
                    height={300}
                  />
                </Grid>

                {/* Post Content */}
                <Grid item xs={12}>
                  <Textarea
                    label="Nội dung bài viết"
                    name="content"
                    value={formik.values.content || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    errorMessage={formik.errors.content}
                    height={500}
                  />
                </Grid>
              </Grid>

              {/* Submit and Cancel Buttons */}
              <Box mt={3} textAlign="right">
                <Button variant="contained" type="submit" color="success" aria-label="Add Post">
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
