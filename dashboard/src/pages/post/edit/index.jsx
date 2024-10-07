import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Avatar,
    Box,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";
import PropTypes from "prop-types";

export default function EditPost({ open, handleClose, selectedData, handleUpdate }) {
    const [formData, setFormData] = useState({
        post_title: '',
        shortDescription: '',
        name: '',
        seoKeywords: '',
        metaDescription: '',
        shortSeoDescription: '',
        articleContent: '',
        staff: [],
        category: [],
        statustPost: '',
    });

    useEffect(() => {
        if (selectedData) {
            setFormData(selectedData);
        }
    }, [selectedData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(formData); // Call the handleUpdate function with the updated data
        handleClose(); // Close the dialog after updating
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent sx={{ padding: 4 }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Avatar
                        src={formData.thumbnail}
                        alt="Thumbnail"
                        sx={{
                            width: { xs: 600, md: 600 },
                            height: { xs: 500, md: 500 },
                            margin: "0 auto",
                            mb: 2,
                        }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Edit Post
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Post Title"
                                name="post_title"
                                value={formData.post_title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Short Description"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="SEO Keywords"
                                name="seoKeywords"
                                value={formData.seoKeywords}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Meta Description"
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Short SEO Description"
                                name="shortSeoDescription"
                                value={formData.shortSeoDescription}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Article Content"
                                name="articleContent"
                                value={formData.articleContent}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Staff (comma-separated)"
                                name="staff"
                                value={formData.staff.join(', ')}
                                onChange={(e) => handleChange({
                                    target: { name: 'staff', value: e.target.value.split(', ') }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Category (comma-separated)"
                                name="category"
                                value={formData.category.join(', ')}
                                onChange={(e) => handleChange({
                                    target: { name: 'category', value: e.target.value.split(', ') }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Status"
                                name="statustPost"
                                value={formData.statustPost}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ mt: 2 }}>
                        <Button type="submit" color="primary">
                            Update
                        </Button>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

EditPost.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedData: PropTypes.object,
    handleUpdate: PropTypes.func.isRequired,
};
