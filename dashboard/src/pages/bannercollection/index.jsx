import React, { useState } from 'react';
import ReusableTable from '../../components/Table';
import DetailBanner from './details';
import { useNavigate } from 'react-router-dom';

const columns = [
    // { label: "ID", field: "id" },
    { label: "Tên công ty", field: "name" },
    { label: "Bộ sưu tập", field: "collection" },
    { label: "Hình ảnh", field: "image" },
    { label: "Trạng thái ", field: "status" },
    // { label: "Mức độ ưu tiên", field: "priority" },
    { label: "Ngày bắt đầu", field: "startDate" },
    { label: "Ngày kết thúc", field: "endDate" },
];

const initialData = [
    {
        id: 1090909,
        name: "Thế Giới Di Động",
        collection: "Bộ sưu tập Điện Thoại Smartphone",
        image: "https://s.net.vn/kWGE",
        status: "active",
        priority: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31"
    },
    {
        id: 20909090909,
        name: "FPT Shop",
        collection: "Bộ sưu tập Laptop Gaming",
        image: "https://example.com/banner_laptop_gaming.jpg",
        status: "active",
        priority: 2,
        startDate: "2024-02-01",
        endDate: "2024-11-30"
    },
    {
        id: 3090909090,
        name: "CellphoneS",
        collection: "Bộ sưu tập Máy Tính Bảng",
        image: "https://example.com/banner_tablet.jpg",
        status: "inactive",
        priority: 3,
        startDate: "2024-03-15",
        endDate: "2024-09-15"
    }
];

export default function BannerCollection() {
    const [selectedData, setSelectedData] = useState(null); // For detail view
    const [open, setOpen] = useState(false); // To control the detail dialog
    const [selectedDataEdit, setSelectedDataEdit] = useState(null); // For edit view
    const [openEdit, setOpenEdit] = useState(false); // To control the edit dialog
    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/dashboard/bannercollection/edit/${id}`);
    };

    const handleDelete = (index) => {
        console.log("Delete", index);
        // Handle the delete logic here if necessary
    };

    const handleEye = (data) => {
        setSelectedData(data); // Display selected data in detail view
        setOpen(true); // Open the detail dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the detail dialog
    };

    return (
        <>
            <ReusableTable
                data={initialData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEye={handleEye}
                navigate={"/dashboard/bannercollection/create"}
            />

            {selectedData && (
                <DetailBanner
                    open={open}
                    handleClose={handleClose}
                    selectedData={selectedData}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </>
    );
}
