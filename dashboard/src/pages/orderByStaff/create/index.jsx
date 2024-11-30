import { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  debounce,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CreateOrderByStaff() {
  const storeLocations = [
    { id: 1, name: "Cửa hàng Quận 1" },
    { id: 2, name: "Cửa hàng Quận 7" },
    { id: 3, name: "Cửa hàng Bình Thạnh" },
    { id: 4, name: "Cửa hàng Gò Vấp" },
  ];

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    storeLocation: "",
    products: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  // Debounced search handler
  const fetchSuggestions = debounce(async (term) => {
    if (term) {
      setLoading(true);
      try {
        // Replace with your actual API call
        const mockData = [
          {
            id: 1,
            name: "Máy in ảnh DNP DS820",
            price: "3000000",
            image: "https://via.placeholder.com/50",
          },
          {
            id: 2,
            name: "Mainboard Gigabyte H510M-DS2V",
            price: "2090000",
            image: "https://via.placeholder.com/50",
          },
        ];
        setSuggestions(mockData); // Simulate API response
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductSelect = (product) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      products: [
        ...prevFormData.products,
        { productName: product.name, price: product.price, quantity: 1 },
      ],
    }));
    setSearchTerm("");
    setSuggestions([]);
    setOpenDialog(false);
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const updateProductQuantity = (index, quantity) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].quantity = quantity;
    setFormData({ ...formData, products: updatedProducts });
  };

  const calculateTotalPrice = () => {
    return formData.products.reduce(
      (total, product) => total + parseFloat(product.price) * product.quantity,
      0
    );
  };

  const validateForm = () => {
    if (!formData.customerName || !formData.phone || !formData.storeLocation) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng và vị trí cửa hàng.");
      return false;
    }
    if (formData.products.length === 0) {
      alert("Vui lòng thêm ít nhất một sản phẩm.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting Order:", formData);
      // API call to save the order
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#ffffff",
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Tạo đơn hàng
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            label="Tên khách hàng"
            name="customerName"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            margin="normal"
            required
          />
        </Box>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Vị trí cửa hàng</InputLabel>
          <Select
            name="storeLocation"
            value={formData.storeLocation}
            onChange={(e) =>
              setFormData({ ...formData, storeLocation: e.target.value })
            }
          >
            {storeLocations.map((store) => (
              <MenuItem key={store.id} value={store.name}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleDialogOpen} sx={{ mb: 2 }}>
          Thêm sản phẩm
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="sm" // You can adjust the size (e.g., "xs", "md", "lg")
        >
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogContent>
            <Box>
              {/* Search Input */}
              <TextField
                fullWidth
                placeholder="Tìm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: loading && <CircularProgress size={20} />,
                }}
              />
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <Box>
                  <List>
                    {suggestions.map((item) => (
                      <ListItem
                        key={item.id}
                        button
                        onClick={() => handleProductSelect(item)}
                        sx={{ cursor: "pointer" }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Typography color="red">
                              {parseFloat(item.price).toLocaleString("vi-VN")}{" "}
                              VND
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Đóng</Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Giá (VND)</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProductQuantity(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                      inputProps={{ min: 1 }}
                      sx={{ width: "60px" }}
                    />
                  </TableCell>
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

        <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
          Tổng tiền: {calculateTotalPrice().toLocaleString("vi-VN")} VND
        </Typography>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Tạo đơn hàng
        </Button>
      </form>
    </Box>
  );
}
