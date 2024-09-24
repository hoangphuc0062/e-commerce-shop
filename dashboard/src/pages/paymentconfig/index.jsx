import React from 'react';
import ReusableTable from "../../components/Table";

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
            name: "nguyenvan123",
            accountNumber: "123456789",
            bank: "Vietcombank",
            bankBranch: "Hà Nội",
            accountOwner: "Nguyễn Ngọc Thái",
            note: "Tài khoản chính"
        },
        {
            id: 2029,
            name: "lethithu456",
            accountNumber: "987654321",
            bank: "Techcombank",
            bankBranch: "Hồ Chí Minh",
            accountOwner: "Trương Công Đức",
            note: "Tài khoản phụ"
        },
        {
            id: 3039,
            name: "phamminh789",
            accountNumber: "456123789",
            bank: "BIDV",
            bankBranch: "Đà Nẵng",
            accountOwner: "Nguyễn Dương Hoàng Phúc",
            note: "Dùng cho giao dịch quốc tế"
        }
    ];

    return (
        <>
            <ReusableTable
                data={initialData}
                columns={columns}
            />
        </>
    )
}
