/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import ProductDetailsDialog from "./details";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProduct,
  resetState,
} from "../../redux/slices/product";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import ImportExcelModal from "../../components/excel/ImportExcelModal";
import { Avatar } from "@mui/material";

export default function ProductPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const columns = [
    { label: "Mã", field: "SKU" },
    { label: "Tên sản phẩm", field: "name" },
    { label: "Hình ảnh", field: "thumbnail" },
    { label: "Giá thị trường", field: "priceInMarket" },
    { label: "Giá cửa hàng", field: "historicalPrice" },
    { label: "Giá trên website", field: "price" },
    { label: "Số lượng", field: "onStock" },
    { label: "Trạng thái", field: "status" },
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
    navigate(`/dashboard/product/update/${index._id}`);
  };

  const handleEye = (index) => {
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
  const status = useSelector((state) => state.product.status);
  const products = useSelector((state) => state.product.data.products);
  const deleteStatus = useSelector((state) => state.product.statusDelete);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const updatedProducts = products?.map((product) => {
      if (product.onStock === 0) {
        return { ...product, status: "outofstock" };
      }
      return product;
    });
    setData(updatedProducts);
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, products, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getProduct());
      handleToast("success", "Xóa sản phẩm thành công", "top-right");
    }
    if (deleteStatus === "failed")
      handleToast("error", "Xóa sản phẩm thất bại", "top-right");
    dispatch(resetState({ key: "statusDelete", value: "idle" }));
  }, [deleteStatus, dispatch]);
  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa sản phẩm",
        content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteProduct(index._id)),
      });
    },
    [dispatch]
  );

  const handleSave = (data) => {
    console.log("Save", data);

    setOpen(false);
  };
  const renderImage = (params) => {
    return (
      <Avatar
        src={params.value}
        alt="Product Image"
        variant="square"
        sx={{ width: 50, height: 50 }}
      />
    );
  };
  const columnss = [
    { field: "name", headerName: "Danh mục", width: 200 },
    {
      field: "imageURL",
      headerName: "Hình ảnh",
      width: 100,
      // valueFormatter: (params) => renderUrl(params, backEnd),
      renderCell: renderImage,
    },
    { field: "slug", headerName: "Slug", width: 100 },
    { field: "parentId", headerName: "Danh mục cha", width: 100 },
    { field: "status", headerName: "Trạng thái", width: 200 },
    { field: "order", headerName: "Vị trí", width: 200 },
    { field: "views", headerName: "Lượt xem", width: 100 },
    { field: "description", headerName: "Mô tả", width: 100 },
    { field: "createdAt", headerName: "Ngày tạo", width: 200 },
    { field: "updatedAt", headerName: "Ngày nhập", width: 200 },
  ];

  const validateKey = [
    "_id",
    "name",
    "slug",
    "parentId",
    "status",
    "order",
    "views",
    "description",
    "imageURL",
  ];
  return (
    <>
      {data && (
        <ReusableTable
          columns={columns}
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleEye={handleEye}
          setOpen={setOpen}
        />
      )}

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
      <ImportExcelModal
        validateKey={validateKey}
        columns={columnss
          .filter(
            (col) =>
              col.field !== "createdAt" &&
              col.field !== "updatedAt" &&
              col.field !== "actions"
          )
          .map((col) => col)}
        onSave={handleSave}
        // loading={statusCreate === "loading"}
      />
    </>
  );
}
