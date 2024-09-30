import React, { useState } from 'react';
import ReusableTable from '../../components/Table';

const columns = [
    { label: "ID", field: "id" },
    { label: "Tên công ty", field: "name" },
    { label: "Bộ sưu tập", field: "collection" },
    { label: "Hình ảnh", field: "widthBanner" },
    { label: "Trạng thái ", field: "status" },
    { label: "Mức độ ưu tiên", field: "priority" },
    { label: "Ngày bắt đầu", field: "startDate" },
    { label: "Ngày kết thúc", field: "endDate" },
];
const initialData = [
    {
        id: 1090909,
        name: "Thế Giới Di Động",
        collection: "Bộ sưu tập Điện Thoại Smartphone",
        widthBanner: "https://example.com/banner_smartphone.jpg",
        status: "active",
        priority: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31"
    },
    {
        id: 20909090909,
        name: "FPT Shop",
        collection: "Bộ sưu tập Laptop Gaming",
        widthBanner: "https://example.com/banner_laptop_gaming.jpg",
        status: "active",
        priority: 2,
        startDate: "2024-02-01",
        endDate: "2024-11-30"
    },
    {
        id: 3090909090,
        name: "CellphoneS",
        collection: "Bộ sưu tập Máy Tính Bảng",
        widthBanner: "https://example.com/banner_tablet.jpg",
        status: "inactive",
        priority: 3,
        startDate: "2024-03-15",
        endDate: "2024-09-15"
    }
];
const handleEdit = (data) => {
    setSelectedDataEdit(data); // Pass dữ liệu được chọn vào Edit dialog
    setOpenEdit(true); // Mở dialog chỉnh sửa
};
const handleDelete = (index) => {
    console.log("Delete", index);
    // Thực hiện xóa dữ liệu tại đây nếu cần
};

const handleEye = (data) => {
    setSelectedData(data); // Hiển thị dữ liệu chi tiết
    setOpen(true); // Mở Detail dialog
};

export default function BannerCollection() {
    return (
        <>
            <ReusableTable
                data={initialData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEye={handleEye}


            />
        </>
    )
}
