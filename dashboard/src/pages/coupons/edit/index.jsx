import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, Grid, Paper, TextField, Typography, CircularProgress, Autocomplete } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { handleToast } from "../../../utils/toast"; // Adjust import as necessary
import { CouponSchema } from "../validate";
function UpdateCoupons() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [discountData, setDiscountData] = useState(null);
    // Declare options at the top
    const categoryOptions = ["Category1", "Category2", "Category3", "Category4"];
    const brandOptions = ["Brand1", "Brand2", "Brand3"];
    const collectionOptions = ["Collection1", "Collection2"];
    const productOptions = ["Product1", "Product2", "Product3"];
    useEffect(() => {
        // Fetch discount data based on ID
        const fetchDiscountData = async () => {
            try {
                const response = await fetch(`/api/discounts/${id}`); // Adjust the API endpoint
                if (!response.ok) throw new Error("Failed to fetch discount data");
                const data = await response.json();
                setDiscountData(data);
                formik.setValues(data);
            } catch (error) {
                console.error("Error fetching discount data:", error);
                handleToast("error", "Không thể tải dữ liệu giảm giá", "top-right");
            } finally {
                setLoading(false);
            }
        };
        fetchDiscountData();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            discount: "",
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
            quantity: "",
            quantityMin: "",
            quantityMax: "",
            quantityUsed: "",
            status: "active",
        },
        validationSchema: CouponSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/api/discounts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) throw new Error("Failed to update discount");

                handleToast("success", "Thông tin giảm giá đã được cập nhật", "top-right");
                navigate("/dashboard/discounts"); // Redirect after successful update
            } catch (error) {
                console.error("Error during form submission", error);
                handleToast("error", "Cập nhật thông tin giảm giá thất bại", "top-right");
            }
        },
    });

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
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Cập nhật thông tin giảm giá
                            </Typography>

                            <Grid container spacing={2}>
                                {/* Name Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Tên giảm giá"
                                        name="name"
                                        fullWidth
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>

                                {/* Code Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Mã giảm giá"
                                        name="code"
                                        fullWidth
                                        value={formik.values.code}
                                        onChange={formik.handleChange}
                                        error={formik.touched.code && Boolean(formik.errors.code)}
                                        helperText={formik.touched.code && formik.errors.code}
                                    />
                                </Grid>

                                {/* Discount Amount Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Số tiền giảm"
                                        name="discount"
                                        type="number"
                                        fullWidth
                                        value={formik.values.discount}
                                        onChange={formik.handleChange}
                                        error={formik.touched.discount && Boolean(formik.errors.discount)}
                                        helperText={formik.touched.discount && formik.errors.discount}
                                    />
                                </Grid>

                                {/* Type Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="Loại giảm giá"
                                        name="type"
                                        fullWidth
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                        helperText={formik.touched.type && formik.errors.type}
                                    >
                                        <option value="fixed">Cố định</option>
                                        <option value="percentage">Phần trăm</option>
                                    </TextField>
                                </Grid>

                                {/* Description Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mô tả"
                                        name="description"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </Grid>

                                {/* Start Date Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Ngày bắt đầu"
                                        type="date"
                                        name="startDate"
                                        fullWidth
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                        helperText={formik.touched.startDate && formik.errors.startDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                {/* End Date Field */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Ngày kết thúc"
                                        type="date"
                                        name="endDate"
                                        fullWidth
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                {/* Quantity Field */}
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Số lượng"
                                        name="quantity"
                                        type="number"
                                        fullWidth
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                        helperText={formik.touched.quantity && formik.errors.quantity}
                                    />
                                </Grid>

                                {/* Minimum Quantity Field */}
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Số lượng tối thiểu"
                                        name="quantityMin"
                                        type="number"
                                        fullWidth
                                        value={formik.values.quantityMin}
                                        onChange={formik.handleChange}
                                        error={formik.touched.quantityMin && Boolean(formik.errors.quantityMin)}
                                        helperText={formik.touched.quantityMin && formik.errors.quantityMin}
                                    />
                                </Grid>

                                {/* Maximum Quantity Field */}
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        label="Số lượng tối đa"
                                        name="quantityMax"
                                        type="number"
                                        fullWidth
                                        value={formik.values.quantityMax}
                                        onChange={formik.handleChange}
                                        error={formik.touched.quantityMax && Boolean(formik.errors.quantityMax)}
                                        helperText={formik.touched.quantityMax && formik.errors.quantityMax}
                                    />
                                </Grid>

                                {/* Status Field */}
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        select
                                        label="Trạng thái"
                                        name="status"
                                        fullWidth
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Ngừng hoạt động</option>
                                    </TextField>
                                </Grid>
                                {/* Categories Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={categoryOptions} // Use the declared options
                                        value={formik.values.categoryApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("categoryApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Danh mục áp dụng"
                                                placeholder="Chọn danh mục"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Brands Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={brandOptions} // Use the declared options
                                        value={formik.values.brandApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("brandApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Thương hiệu áp dụng"
                                                placeholder="Chọn thương hiệu"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Collections Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={collectionOptions} // Use the declared options
                                        value={formik.values.collectionApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("collectionApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Bộ sưu tập áp dụng"
                                                placeholder="Chọn bộ sưu tập"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Products Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={productOptions} // Use the declared options
                                        value={formik.values.productApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("productApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Sản phẩm áp dụng"
                                                placeholder="Chọn sản phẩm"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Products Not Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={productOptions} // Use the declared options
                                        value={formik.values.productNotApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("productNotApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Sản phẩm không áp dụng"
                                                placeholder="Chọn sản phẩm không áp dụng"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Brands Not Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={brandOptions} // Use the declared options
                                        value={formik.values.brandNotApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("brandNotApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Thương hiệu không áp dụng"
                                                placeholder="Chọn thương hiệu không áp dụng"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Collections Not Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={collectionOptions} // Use the declared options
                                        value={formik.values.collectionNotApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("collectionNotApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Bộ sưu tập không áp dụng"
                                                placeholder="Chọn bộ sưu tập không áp dụng"
                                            />
                                        )}
                                    />
                                </Grid>

                                {/* Categories Not Apply */}
                                <Grid item xs={12} md={3}>
                                    <Autocomplete
                                        multiple
                                        options={categoryOptions} // Use the declared options
                                        value={formik.values.categoryNotApply}
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue("categoryNotApply", newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Danh mục không áp dụng"
                                                placeholder="Chọn danh mục không áp dụng"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            {/* Submit Button */}
                            <Box mt={3} textAlign="right">
                                <Button variant="contained" color="success" type="submit">
                                    Cập nhật giảm giá
                                </Button>
                                <Button variant="contained" color="error" onClick={() => navigate("/dashboard/coupons")} style={{ marginLeft: 10 }}>
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

export default UpdateCoupons;
