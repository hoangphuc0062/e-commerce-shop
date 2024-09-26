import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { useFormik } from "formik";
import propTypes from "prop-types";
import { WebconFigValidate } from "../validate/WebConFigSchema";
import ImageUploader from "../../../components/upload";

const EditWebConfigDialog = ({ open, onClose, initialValues, onSave }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: initialValues?.name || "",
            email: initialValues?.email || "",
            SDT: initialValues?.SDT || "",
            address: initialValues?.address || "",
            image: initialValues?.image || "",
            fanpage: initialValues?.fanpage || "",
            youtube: initialValues?.youtube || "",
            tiktok: initialValues?.tiktok || "",
        },
        validationSchema: WebconFigValidate,
        onSubmit: (values) => {
            const updatedData = { ...initialValues, ...values };

            onSave(updatedData); // Gọi hàm cập nhật

            // Kiểm tra nếu cập nhật thành công, hiển thị Snackbar
            setOpenSnackbar(true);
        },
    });

    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues);
        }
    }, [initialValues]);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle sx={{ fontSize: "1.5rem" }}>Chỉnh sửa thông tin</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <ImageUploader
                            onUploadComplete={(url) => formik.setFieldValue("image", url)}
                            imageUrl={formik.values.image}
                        />
                        <TextField
                            label="Tên công ty"
                            fullWidth
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Số điện thoại"
                            fullWidth
                            name="SDT"
                            value={formik.values.SDT}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.SDT && Boolean(formik.errors.SDT)}
                            helperText={formik.touched.SDT && formik.errors.SDT}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Địa chỉ"
                            fullWidth
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Fanpage Facebook"
                            fullWidth
                            name="fanpage"
                            value={formik.values.fanpage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fanpage && Boolean(formik.errors.fanpage)}
                            helperText={formik.touched.fanpage && formik.errors.fanpage}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="YouTube"
                            fullWidth
                            name="youtube"
                            value={formik.values.youtube}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.youtube && Boolean(formik.errors.youtube)}
                            helperText={formik.touched.youtube && formik.errors.youtube}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="TikTok"
                            fullWidth
                            name="tiktok"
                            value={formik.values.tiktok}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tiktok && Boolean(formik.errors.tiktok)}
                            helperText={formik.touched.tiktok && formik.errors.tiktok}
                            sx={{ mb: 2 }}
                        />
                        <DialogActions>
                            <Button onClick={onClose} size="large">
                                Hủy
                            </Button>
                            <Button type="submit" variant="contained" color="primary" size="large">
                                Lưu
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            {/* Snackbar hiển thị thông báo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Cập nhật thành công!
                </Alert>
            </Snackbar>
        </>
    );
};

EditWebConfigDialog.propTypes = {
    open: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    initialValues: propTypes.object,
    onSave: propTypes.func.isRequired,
};

export default EditWebConfigDialog;
