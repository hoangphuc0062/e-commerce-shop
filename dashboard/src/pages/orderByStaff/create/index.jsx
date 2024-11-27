import React, { useState, useRef } from "react";
import { useReactToPrint } from 'react-to-print';  // Add this import
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
    Autocomplete,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import InvoiceComponent from "../InvoiceComponent";

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
            variants: [], // Sản phẩm đơn, không có biến thể
            price: 3000000,
        },
    ];

    const staffList = [
        { id: 1, name: "Nguyễn Văn A" },
        { id: 2, name: "Trần Thị B" },
        { id: 3, name: "Phạm Văn C" },
        { id: 4, name: "Lê Thị D" },
    ];

    const storeLocations = [
        { id: 1, name: "Cửa hàng Quận 1" },
        { id: 2, name: "Cửa hàng Quận 7" },
        { id: 3, name: "Cửa hàng Bình Thạnh" },
        { id: 4, name: "Cửa hàng Gò Vấp" },
    ];

    const [formData, setFormData] = useState({
        customerName: "",
        staffName: "",
        storeLocation: "",
        products: [],
        receivedAmount: 0,
        change: 0,
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

    const handleReceivedAmountChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => {
            const change = value - calculateTotalPrice();
            return {
                ...prevData,
                receivedAmount: value,
                change: change,
            };
        });
    };
    const calculateTotalPrice = () => {
        return formData.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
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
        setFormData({
            ...formData,
            products: updatedProducts,
        });
    };

    // Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = productsList.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // tạo và in hóa đơn
    const invoiceRef = useRef();
    const handlePrintInvoice = useReactToPrint({
        content: () => {
            if (invoiceRef.current) {
                return invoiceRef.current;
            }
            alert("Không có dữ liệu để in.");
            return null;
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dữ liệu đơn hàng:", formData);
        handlePrintInvoice(); // Gọi hàm in hóa đơn sau khi tạo đơn hàng
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                margin: "auto",
                padding: 3,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#ffffff",
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
                <Autocomplete
                    options={staffList}
                    getOptionLabel={(option) => option.name}
                    value={staffList.find((staff) => staff.name === formData.staffName) || null}
                    onChange={(event, value) => {
                        setFormData({
                            ...formData,
                            staffName: value ? value.name : "", // Cập nhật tên nhân viên hoặc để trống nếu không chọn
                        });
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Nhân viên xử lý" fullWidth required />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Vị trí cửa hàng</InputLabel>
                    <Select
                        name="storeLocation"
                        value={formData.storeLocation}
                        onChange={handleFormChange}
                        required
                    >
                        {storeLocations.map((store) => (
                            <MenuItem key={store.id} value={store.name}>
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                    Thông tin sản phẩm
                </Typography>
                <TextField
                    label="Tìm kiếm sản phẩm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    margin="normal"
                />
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
                                    {productsList
                                        .find(
                                            (product) =>
                                                product.id === parseInt(newProduct.productId)
                                        )
                                        ?.variants.map((variant) => (
                                            <MenuItem key={variant.variant} value={variant.variant}>
                                                {variant.variant}
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
                        value={newProduct.quantity}
                        onChange={handleProductChange}
                        type="number"
                        fullWidth
                    />
                    <IconButton
                        color="primary"
                        onClick={addProduct}
                        sx={{ alignSelf: "flex-end", marginTop: "auto" }}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Box>

                {/* Danh sách các sản phẩm đã chọn */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sản phẩm</TableCell>
                                <TableCell>Biến thể</TableCell>
                                <TableCell>Giá (VND)</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData.products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.variant || "Không có"}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
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

                {/* Tổng tiền và nhận tiền */}
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Tổng tiền: {calculateTotalPrice()} đ
                </Typography>

                <TextField
                    label="Tiền nhận"
                    name="receivedAmount"
                    type="number"
                    value={formData.receivedAmount}
                    onChange={handleReceivedAmountChange}
                    fullWidth
                    margin="normal"
                    required
                />

                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Tiền thối lại: {formData.change} đ
                </Typography>

                <Button variant="contained" color="primary" type="submit">
                    Tạo đơn hàng
                </Button>
            </form>
            <InvoiceComponent ref={invoiceRef} orderData={formData} />
        </Box>
    );
}
