import { useState } from "react";
import { Button, Modal, Box, TextField, Grid, Paper } from "@mui/material";
import ReusableTable from "../../components/table";
import EyeCoupons from "./deails";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatPercentage } from "../../utils/format-time";
const columns = [
    // { label: "id", field: "id" },
    // { label: "Tên giảm giá", field: "name" },
    { label: "Mã giảm giá", field: "code" },
    { label: "Giảm giá", field: "discount" },
    { label: "Loại", field: "type" },
    // { label: " Mô tả", field: "description" },
    { label: "Ngày bắt đầu", field: "startDate" },
    { label: "Ngày kết thúc", field: "endDate" },
    // { label: "Danh mục áp dụng", field: "categoryApply" },
    // { label: "Hãng áp dụng", field: "brandApply" },
    // { label: "Bộ sưu tập áp dụng", field: "collectionApply" },
    // { label: "Sản phẩm áp dụng", field: "productApply" },
    // { label: "Sản phẩm không áp dụng", field: "productNotApply" },
    // { label: "Hãng không áp dụng", field: "brandNotApply" },
    // { label: "Bộ sưu tập không áp dụng", field: "collectionNotApply" },
    // { label: "Danh mục không áp dụng", field: "categoryNotApply" },
    { label: "Số lượng", field: "quantity" },
    // { label: "Số lượng tối thiểu", field: "quantityMin" },
    // { label: "Số lượng tối đa", field: "quantityMax" },
    { label: "Số lượng đã sử dụng", field: "quantityUsed" },
    { label: "Trạng thái", field: "status" },
]
const initialData = [
    {
        id: 19019,
        name: "Giảm 10% nhân dịp khai trương chi nhánh mới",
        code: "MELAX2012",
        discount: 10,
        type: "percent",
        description: "Giảm 10% cho tất cả sản phẩm",
        startDate: "2021-01-01",
        endDate: "2021-01-31",
        categoryApply: ["Category1", "Category2"],
        brandApply: ["Brand1", "Brand2"],
        collectionApply: ["Collection1", "Collection2"],
        productApply: ["Product1", "Product2"],
        productNotApply: ["Product3"],
        brandNotApply: ["Brand3"],
        collectionNotApply: ["Collection3"],
        categoryNotApply: ["Category3"],
        quantity: 100,
        quantityMin: 10,
        quantityMax: 100,
        quantityUsed: 10,
        status: "active",
    },
    {
        id: 29029,
        name: "Giảm 100k",
        code: "NYCLDCC",
        discount: 200000,
        type: "fixed",
        description: "Giảm 100k cho các sản phẩm liên quan",
        startDate: "2021-02-01",
        endDate: "2021-02-31",
        categoryApply: ["Category1", "Category2", "Category3", "Category4"],
        brandApply: ["Brand1", "Brand2"],
        collectionApply: ["Collection1", "Collection2"],
        productApply: ["Product1", "Product2"],
        productNotApply: ["Product3"],
        brandNotApply: ["Brand3"],
        collectionNotApply: ["Collection3"],
        categoryNotApply: ["Category3"],
        quantity: 100,
        quantityMin: 10,
        quantityMax: 100,
        quantityUsed: 10,
        status: "active",
    }
]
export default function CouponsList() {
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const navigate = useNavigate();
    const handleEdit = (index) => {
        console.log("Edit", index);
    };

    const handleDelete = (index) => {
        console.log("Delete", index);
    };

    const handleEye = (index) => {
        setSelectedData(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const discount = 20;
    // const amount = 200000;
    // console.log(formatPercentage(discount));
    // console.log(formatCurrency(amount));
    return (
        <>   <ReusableTable
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={initialData}
            columns={columns}
            handleEye={handleEye}
            navigate={"/dashboard/coupons/create"}
        />
            {selectedData && (
                <EyeCoupons
                    open={open}
                    handleClose={handleClose}
                    selectedData={selectedData}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </>
    )
}
