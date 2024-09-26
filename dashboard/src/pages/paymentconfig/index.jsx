import React, { useState } from 'react';
import ReusableTable from "../../components/Table";
import EditPaymentDialog from './eidt';

export default function PaymentConfig() {
    const columns = [
        { label: "ID", field: "id" },
        { label: "Tên tài khoản", field: "name" },
        { label: "Số tài khoản", field: "accountNumber" },
        { label: "Ngân hàng", field: "bank" },
        { label: "Chi nhánh", field: "bankBranch" },
        { label: "Chủ tài khoản", field: "accountOwner" },
        { label: "Ghi chú", field: "note" }
    ];

    const initialData = [
        {
            id: 1019,
            name: "TRASUAMAMTOM",
            accountNumber: "123456789",
            bank: "Vietcombank",
            bankBranch: "Hà Nội",
            accountOwner: "Nguyễn Ngọc Thái",
            note: "Tài khoản chính"
        },
        {
            id: 2029,
            name: "DUCPRO",
            accountNumber: "987654321",
            bank: "Techcombank",
            bankBranch: "Hồ Chí Minh",
            accountOwner: "Trương Công Đức",
            note: "Tài khoản phụ"
        },
        {
            id: 3039,
            name: "HAKU",
            accountNumber: "456123789",
            bank: "BIDV",
            bankBranch: "Đà Nẵng",
            accountOwner: "Nguyễn Dương Hoàng Phúc",
            note: "Dùng cho giao dịch quốc tế"
        }
    ];

    const [data, setData] = useState(initialData); // State quản lý dữ liệu
    const [openEdit, setOpenEdit] = useState(false); // State quản lý mở/đóng Edit dialog
    const [selectedDataEdit, setSelectedDataEdit] = useState(null); // Dữ liệu được chọn để edit

    // Hàm xử lý khi nhấn nút "Sửa"
    const handleEdit = (data) => {
        setSelectedDataEdit(data); // Pass dữ liệu được chọn vào Edit dialog
        setOpenEdit(true); // Mở dialog chỉnh sửa
    };

    // Hàm xử lý khi lưu thông tin chỉnh sửa
    const handleSave = (updatedData) => {
        // Cập nhật dữ liệu sau khi chỉnh sửa
        setData((prevData) =>
            prevData.map((item) =>
                item.id === updatedData.id ? updatedData : item
            )
        );
        setOpenEdit(false); // Đóng dialog sau khi lưu
    };
    const handleDelete = (index) => {
        console.log("Delete", index);
        // Thực hiện xóa dữ liệu tại đây nếu cần
    };
    return (
        <>
            <ReusableTable
                data={data} // Dữ liệu bảng
                columns={columns}
                handleEdit={handleEdit} // Thêm hàm handleEdit vào table để bật chức năng sửa
                handleDelete={handleDelete}
            />

            <EditPaymentDialog
                open={openEdit} // Mở dialog khi sửa
                onClose={() => setOpenEdit(false)} // Đóng dialog khi không cần
                initialValues={selectedDataEdit} // Pass dữ liệu được chọn vào Edit dialog
                onSave={handleSave} // Gọi hàm save khi người dùng lưu chỉnh sửa
            />
        </>
    );
}
