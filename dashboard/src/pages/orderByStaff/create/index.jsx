import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "Sản phẩm A",
    variants: ["Đỏ", "Xanh", "Vàng"],
    price: "1,000,000 đ",
    stock: 10,
  },
  {
    id: 2,
    name: "Sản phẩm B",
    variants: ["S", "M", "L"],
    price: "500,000 đ",
    stock: 20,
  },
  {
    id: 3,
    name: "Sản phẩm C",
    variants: ["500ml", "1L", "2L"],
    price: "300,000 đ",
    stock: 15,
  },
];

export default function CreateOrderByStaff() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductChange = (event, newValue) => {
    setSelectedProduct(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      {/* Tìm kiếm sản phẩm */}
      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.name}
        onChange={handleProductChange}
        renderInput={(params) => (
          <TextField {...params} label="Tìm kiếm sản phẩm" variant="outlined" />
        )}
        sx={{ width: "100%", marginBottom: "16px" }}
      />

      {/* Chi tiết sản phẩm được chọn */}
      {selectedProduct && (
        <Card sx={{ p: 2, borderRadius: "8px", boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              {selectedProduct.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Giá: <strong>{selectedProduct.price}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Số lượng còn: <strong>{selectedProduct.stock}</strong>
            </Typography>
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
              Biến thể:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              {selectedProduct.variants.map((variant, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: "16px",
                  }}
                >
                  {variant}
                </Button>
              ))}
            </Box>

            {/* Nút thao tác */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" fullWidth>
                Mua ngay
              </Button>
              <Button variant="outlined" color="primary" fullWidth>
                Thêm vào giỏ
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
