import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CreateOrderByStaff() {
    const productsList = [
        {
            id: 1,
            name: "Đồng hồ Apple Watch",
            variants: [
                { variant: "Màu đen", price: 5000000 },
                { variant: "Màu trắng", price: 5200000 },
            ],
        },
        {
            id: 2,
            name: "Đồng hồ Samsung Galaxy",
            variants: [
                { variant: "Màu xanh", price: 4500000 },
                { variant: "Màu bạc", price: 4700000 },
            ],
        },
        {
            id: 3,
            name: "Đồng hồ Casio",
            variants: [],
            price: 3000000, // Sản phẩm đơn, không có biến thể
        },
    ];
    const staffList = [
        { id: 1, name: "Nguyễn Văn A" },
        { id: 2, name: "Trần Thị B" },
        { id: 3, name: "Phạm Văn C" },
        { id: 4, name: "Lê Thị D" },
    ];
    const [formData, setFormData] = useState({
        customerName: "",
        staffName: "",
        products: [],
    });

    const [newProduct, setNewProduct] = useState({
        productId: "",
        productName: "",
        variant: "",
        price: 0,
        quantity: 1,
        isVariant: false, // Chỉ ra nếu sản phẩm có biến thể
    });

    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm sản phẩm

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        if (name === "productId") {
            const selectedProduct = productsList.find(
                (product) => product.id === parseInt(value)
            );
            setNewProduct({
                ...newProduct,
                productId: value,
                productName: selectedProduct.name,
                variant: "",
                price: selectedProduct.variants.length
                    ? 0
                    : selectedProduct.price, // Nếu không có biến thể, lấy giá mặc định
                isVariant: selectedProduct.variants.length > 0, // Kiểm tra sản phẩm có biến thể không
            });
        } else if (name === "variant") {
            const selectedProduct = productsList.find(
                (product) => product.id === parseInt(newProduct.productId)
            );
            const selectedVariant = selectedProduct.variants.find(
                (v) => v.variant === value
            );
            setNewProduct({
                ...newProduct,
                variant: value,
                price: selectedVariant.price,
            });
        } else {
            setNewProduct({
                ...newProduct,
                [name]: value,
            });
        }
    };

    const addProduct = () => {
        if (
            newProduct.productId &&
            (newProduct.variant || !newProduct.isVariant) && // Kiểm tra sản phẩm có biến thể hay không
            newProduct.quantity > 0
        ) {
            setFormData({
                ...formData,
                products: [...formData.products, newProduct],
            });
            setNewProduct({
                productId: "",
                productName: "",
                variant: "",
                price: 0,
                quantity: 1,
                isVariant: false,
            });
        } else {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        }
    };

    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dữ liệu đơn hàng:", formData);
    };

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = productsList.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: "auto",
                padding: 3,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Tạo Đơn Hàng Mới
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Tên khách hàng"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Nhân viên xử lý</InputLabel>
                    <Select
                        name="staffName"
                        value={formData.staffName}
                        onChange={handleFormChange}
                        required
                    >
                        {staffList.map((staff) => (
                            <MenuItem key={staff.id} value={staff.name}>
                                {staff.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                    Thông tin sản phẩm
                </Typography>

                {/* Ô nhập liệu tìm kiếm sản phẩm */}
                <TextField
                    label="Tìm kiếm sản phẩm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    <Button
                        variant={newProduct.isVariant ? "outlined" : "contained"}
                        onClick={() => setNewProduct({ ...newProduct, isVariant: false })}
                    >
                        Sản phẩm đơn
                    </Button>
                    <Button
                        variant={newProduct.isVariant ? "contained" : "outlined"}
                        onClick={() => setNewProduct({ ...newProduct, isVariant: true })}
                    >
                        Sản phẩm có biến thể
                    </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Sản phẩm</InputLabel>
                        <Select
                            name="productId"
                            value={newProduct.productId}
                            onChange={handleProductChange}
                        >
                            {filteredProducts.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {newProduct.isVariant ? (
                        <>
                            <FormControl fullWidth>
                                <InputLabel>Biến thể</InputLabel>
                                <Select
                                    name="variant"
                                    value={newProduct.variant}
                                    onChange={handleProductChange}
                                >
                                    {filteredProducts
                                        .find((product) => product.id === parseInt(newProduct.productId))
                                        .variants.map((v, index) => (
                                            <MenuItem key={index} value={v.variant}>
                                                {v.variant}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Giá (VND)"
                                name="price"
                                value={newProduct.price}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </>
                    ) : (
                        <TextField
                            label="Giá (VND)"
                            name="price"
                            value={newProduct.price}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    )}

                    <TextField
                        label="Số lượng"
                        name="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={handleProductChange}
                        fullWidth
                    />
                    <IconButton color="primary" onClick={addProduct}>
                        <AddCircleIcon />
                    </IconButton>
                </Box>

                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Biến thể</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData.products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.variant || "Không có biến thể"}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeProduct(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                    Xác nhận đơn hàng
                </Button>
            </form>
        </Box>
    );
}
