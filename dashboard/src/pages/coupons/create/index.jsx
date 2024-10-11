import React, { useState } from 'react';
import { Grid, Box, Paper, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import CustomInputField from "../../../components/InputField";
import Textarea from "../../../components/textarea";
import { useNavigate } from "react-router-dom";
import { CouponSchema } from "../validate";
import NotificationModal from '../Notification';

const categoryOptions = ["Category1", "Category2", "Category3", "Category4"];
const brandOptions = ["Brand1", "Brand2", "Brand3"];
const collectionOptions = ["Collection1", "Collection2"];
const productOptions = ["Product1", "Product2", "Product3"];

function AddCoupon() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false); // State for advanced fields

    const handleModalClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            code: "",
            name: "",
            discount: 0,
            type: "fixed",
            description: "",
            startDate: "",
            endDate: "",
            categoryApply: [],
            brandApply: [],
            collectionApply: [],
            productApply: [],
            productNotApply: [],
            brandNotApply: [],
            collectionNotApply: [],
            categoryNotApply: [],
            quantity: 100,
            quantityMin: 10,
            quantityMax: 100,
            status: "active",
        },
        validationSchema: CouponSchema,
        onSubmit: (values, { resetForm }) => {
            try {
                setMessage("Mã giảm giá đã được thêm thành công!");
                setOpen(true);
                console.log("Form submitted", values);
                resetForm();
                navigate("/dashboard/coupons/");
            } catch (error) {
                console.error("Error during form submission", error);
                setMessage("Đã xảy ra lỗi khi thêm mã giảm giá.");
                setOpen(true);
            }
        },
    });

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
    });

    const handleAdvancedToggle = () => {
        setShowAdvanced(!showAdvanced);
        // Mark advanced fields as touched when toggling
        formik.setTouched({
            ...formik.touched,
            collectionApply: true,
            productApply: true,
            categoryApply: true,
            brandApply: true,
        });
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box p={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Grid container spacing={2}>
                                    {/* Primary Fields */}
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Tên Mã Giảm Giá"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            {...getErrorProps("name")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Mã Giảm Giá"
                                            name="code"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            {...getErrorProps("code")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Số Tiền Giảm Giá"
                                            name="discount"
                                            type="number"
                                            value={formik.values.discount.toString()}
                                            onChange={(e) => formik.setFieldValue('discount', e.target.value)}
                                            {...getErrorProps("discount")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                                            <InputLabel>Loại Giảm Giá</InputLabel>
                                            <Select
                                                name="type"
                                                value={formik.values.type}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value="fixed">Giảm Giá Cố Định</MenuItem>
                                                <MenuItem value="percent">Giảm Giá Theo Phần Trăm</MenuItem>
                                            </Select>
                                            {formik.touched.type && formik.errors.type && (
                                                <FormHelperText>{formik.errors.type}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Textarea
                                            label="Mô Tả"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            {...getErrorProps("description")}
                                            height={250}
                                        />
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
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Số Lượng"
                                            name="quantity"
                                            type="number"
                                            value={formik.values.quantity.toString()}
                                            onChange={(e) => formik.setFieldValue('quantity', e.target.value)}
                                            {...getErrorProps("quantity")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Số Lượng Tối Thiểu"
                                            name="quantityMin"
                                            type="number"
                                            value={formik.values.quantityMin.toString()}
                                            onChange={(e) => formik.setFieldValue('quantityMin', e.target.value)}
                                            {...getErrorProps("quantityMin")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInputField
                                            label="Số Lượng Tối Đa"
                                            name="quantityMax"
                                            type="number"
                                            value={formik.values.quantityMax.toString()}
                                            onChange={(e) => formik.setFieldValue('quantityMax', e.target.value)}
                                            {...getErrorProps("quantityMax")}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Advanced Toggle Button */}
                                <Box mt={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleAdvancedToggle}
                                    >
                                        {showAdvanced ? 'Ẩn Nâng Cao' : 'Hiển Thị Nâng Cao'}
                                    </Button>
                                </Box>

                                {/* Advanced Fields */}
                                {showAdvanced && (
                                    <Grid container spacing={2} mt={2}>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth error={formik.touched.collectionApply && Boolean(formik.errors.collectionApply)}>
                                                <InputLabel>Áp Dụng Cho Bộ Sưu Tập</InputLabel>
                                                <Select
                                                    name="collectionApply"
                                                    value={formik.values.collectionApply}
                                                    onChange={(event) => formik.setFieldValue("collectionApply", event.target.value)}
                                                    multiple
                                                >
                                                    {collectionOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.collectionApply && formik.errors.collectionApply && (
                                                    <FormHelperText>{formik.errors.collectionApply}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth error={formik.touched.productApply && Boolean(formik.errors.productApply)}>
                                                <InputLabel>Áp Dụng Cho Sản Phẩm</InputLabel>
                                                <Select
                                                    name="productApply"
                                                    value={formik.values.productApply}
                                                    onChange={(event) => formik.setFieldValue("productApply", event.target.value)}
                                                    multiple
                                                >
                                                    {productOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.productApply && formik.errors.productApply && (
                                                    <FormHelperText>{formik.errors.productApply}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth error={formik.touched.categoryApply && Boolean(formik.errors.categoryApply)}>
                                                <InputLabel>Áp Dụng Cho Danh Mục</InputLabel>
                                                <Select
                                                    name="categoryApply"
                                                    value={formik.values.categoryApply}
                                                    onChange={(event) => formik.setFieldValue("categoryApply", event.target.value)}
                                                    multiple
                                                >
                                                    {categoryOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.categoryApply && formik.errors.categoryApply && (
                                                    <FormHelperText>{formik.errors.categoryApply}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth error={formik.touched.brandApply && Boolean(formik.errors.brandApply)}>
                                                <InputLabel>Áp Dụng Cho Thương Hiệu</InputLabel>
                                                <Select
                                                    name="brandApply"
                                                    value={formik.values.brandApply}
                                                    onChange={(event) => formik.setFieldValue("brandApply", event.target.value)}
                                                    multiple
                                                >
                                                    {brandOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.brandApply && formik.errors.brandApply && (
                                                    <FormHelperText>{formik.errors.brandApply}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Sản Phẩm Không Áp Dụng</InputLabel>
                                                <Select
                                                    name="productNotApply"
                                                    value={formik.values.productNotApply}
                                                    onChange={(event) => formik.setFieldValue("productNotApply", event.target.value)}
                                                    multiple
                                                >
                                                    {productOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Thương Hiệu Không Áp Dụng</InputLabel>
                                                <Select
                                                    name="brandNotApply"
                                                    value={formik.values.brandNotApply}
                                                    onChange={(event) => formik.setFieldValue("brandNotApply", event.target.value)}
                                                    multiple
                                                >
                                                    {brandOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Bộ Sưu Tập Không Áp Dụng</InputLabel>
                                                <Select
                                                    name="collectionNotApply"
                                                    value={formik.values.collectionNotApply}
                                                    onChange={(event) => formik.setFieldValue("collectionNotApply", event.target.value)}
                                                    multiple
                                                >
                                                    {collectionOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Danh Mục Không Áp Dụng</InputLabel>
                                                <Select
                                                    name="categoryNotApply"
                                                    value={formik.values.categoryNotApply}
                                                    onChange={(event) => formik.setFieldValue("categoryNotApply", event.target.value)}
                                                    multiple
                                                >
                                                    {categoryOptions.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={3} textAlign="right">
                    <Button variant="contained" type="submit" color="success" aria-label="Add Coupon">
                        Thêm mã giảm giá
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate("/dashboard/coupons")}
                        style={{ marginLeft: 10 }}
                        aria-label="Cancel"
                    >
                        Hủy
                    </Button>
                </Box>
            </form>
            <NotificationModal open={open} onClose={handleModalClose} message={message} />
        </>
    );
}





export default AddCoupon;
