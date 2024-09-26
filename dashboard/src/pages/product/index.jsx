/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReusableTable from "../../components/Table";
import ProductDetailsDialog from "./details";

export default function ProductPage() {
  const columns = [
    { label: "mã", field: "sku" },
    { label: "Tên sản phẩm", field: "name" },
    { label: "hình ảnh", field: "imgage" },
    { label: "Giá", field: "price" },
    { label: "Số lượng", field: "quantity" },
    { label: "Loại", field: "type" },
    { label: "Mô tả", field: "description" },
    { label: "Trạng thái", field: "status" },
  ];
  const initialData = [
    {
      id: 1,
      sku: "SP001",
      name: "Áo thun",
      images: [
        "https://via.placeholder.com/50",
        "https://i0.wp.com/travelsummary.com/wp-content/uploads/2017/05/12.-View-of-Velociraptor-from-Outside.jpg?fit=750%2C750",
        "https://via.placeholder.com/50",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTofZXK-_G7CFJF8T32HbnSjj-Vtl9w9BLXUg&s",
      ],
      price: "100000",
      quantity: "100",
      type: "Áo",
      description: "Áo thun cotton",
      status: "instock",
      colors: ["#FF6B6B", "#6BFF6B", "#6B6BFF"],
      sizes: [38, 40, 42, 44],
      stock: 100,
    },
    {
      id: 2,
      sku: "SP002",
      name: "Quần jean",
      imgage: "https://via.placeholder.com/50",
      price: "200000",
      quantity: "100",
      type: "Quần",
      description: "Quần jean dài",
      status: "outofstock",
    },
    {
      id: 3,
      sku: "SP003",
      name: "Giày thể thao",
      imgage: "https://via.placeholder.com/50",
      price: "300000",
      quantity: "100",
      type: "Giày",
      description: "Giày thể thao",
      status: "abouttosell",
    },
  ];

  const [product, setProduct] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [selectedSize, setSelectedSize] = useState(42);
  const [tabValue, setTabValue] = useState(0);
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };
  const handleEdit = (index) => {
    console.log("Edit", index);
  };

  const handleDelete = (index) => {
    console.log("Delete", index);
  };
  const handleEye = (index) => {
    console.log("Eye", index);
    setProduct(index);
    setOpenDialog(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleQuantity = () => {
    console.log("Quantity");
  };
  return (
    <>
      <ReusableTable
        data={initialData}
        columns={columns}
        navigate={"/dashboard/product/create"}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleEye={handleEye}
      />
      <ProductDetailsDialog
        product={product}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        handleAddToCart={handleAddToCart}
        selectedColor={selectedColor}
        setSelectedColor={handleColorChange}
        quantity={1}
        setQuantity={handleQuantity}
        selectedSize={selectedSize}
        setSelectedSize={handleSizeChange}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
      />
    </>
  );
}
