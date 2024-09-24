import React, { useState } from 'react';
import ReusableTable from "../../components/Table";
import DetailWeb from './details';
import EditWebConfigDialog from './edit';

export default function SiteConfig() {
    const columns = [
        { label: "ID", field: "id" },
        { label: "Tên công ty", field: "name" },
        { label: "Email", field: "email" },
        { label: "SDT", field: "SDT" },
        { label: "Địa chỉ", field: "address" },
        { label: "Logo", field: "image" },
        { label: "Fanpage Facebook", field: "fanpage" },
        { label: "YouTube", field: "youtobe" },
        { label: "Tiktok", field: "tiktok" }
    ];

    const initialData = [
        {
            id: 929,
            name: "Công ty ABC",
            email: "abc@example.com",
            SDT: "0123456789",
            address: "123 Đường A, Quận B, Thành phố C",
            image: "https://via.placeholder.com/150",  // Placeholder image
            fanpage: "https://facebook.com/abc",
            youtobe: "https://youtube.com/channel/abc",
            tiktok: "https://tiktok.com/@abc"
        },
    ];

    // Quản lý dữ liệu bảng và dữ liệu được chọn cho Edit
    const [data, setData] = useState(initialData); // State quản lý dữ liệu
    const [open, setOpen] = useState(false); // State quản lý mở/đóng Detail dialog
    const [selectedData, setSelectedData] = useState(null); // Dữ liệu hiện tại cho chi tiết
    const [openEdit, setOpenEdit] = useState(false); // State quản lý mở/đóng Edit dialog
    const [selectedDataEdit, setSelectedDataEdit] = useState(null); // Dữ liệu được chọn để edit

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

    const handleClose = () => {
        setOpen(false); // Đóng Detail dialog
    };

    // Hàm xử lý khi lưu thông tin chỉnh sửa
    const handleSave = (updatedData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === updatedData.id ? updatedData : item
            )
        );
        setOpenEdit(false); // Đóng dialog sau khi lưu
    };

    return (
        <>
            <ReusableTable
                data={data} // Sử dụng state `data` thay vì `initialData`
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEye={handleEye}
            />

            <DetailWeb
                open={open}
                handleClose={handleClose}
                selectedData={selectedData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />

            <EditWebConfigDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)} // Đóng dialog khi không cần
                initialValues={selectedDataEdit} // Pass dữ liệu được chọn vào Edit dialog
                onSave={handleSave} // Gọi hàm save khi người dùng lưu chỉnh sửa
            />
        </>
    );
}
