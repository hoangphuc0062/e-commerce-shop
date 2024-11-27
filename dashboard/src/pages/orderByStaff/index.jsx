import { useState } from "react";
import ReusableTable from "../../components/table";

export default function OrderByStaff() {
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("");

    const columns = [
        { label: "Mã đơn hàng", field: "orderCode" },
        { label: "Tên khách hàng", field: "name" },
        { label: "Ngày đặt hàng", field: "orderDate" },
        { label: "Tổng tiền", field: "totalAmount" },
        { label: "Phương thức", field: "paymentMethod" },
        { label: "Trạng thái đơn hàng", field: "orderStatus" },
        { label: "Nhân viên xử lý", field: "staffName" },
    ];

    const initialData = [
        {

            id: 121111,
            orderCode: "DH001",
            name: "Nguyễn Văn A",
            orderDate: "2024-11-01",
            totalAmount: "1,000,000 VND",
            paymentMethod: "VNPAY",
            orderStatus: "completed",
            staffName: "Lê Thị B",
        },
        {
            id: 2,
            orderCode: "DH002",
            name: "Trần Thị C",
            orderDate: "2024-11-02",
            totalAmount: "2,000,000 VND",
            paymentMethod: "COD",
            orderStatus: "paid",
            staffName: "Nguyễn Văn D",
        },
        {
            id: 3,
            orderCode: "DH003",
            name: "Phạm Văn E",
            orderDate: "2024-11-03",
            totalAmount: "500,000 VND",
            paymentMethod: "MOMO",
            orderStatus: "refunded",
            staffName: "Trần Văn F",
        },
    ];

    const statusOptions = [
        { value: "cancelled", label: "Đã hủy" },
        { value: "returned", label: "Đã trả hàng" },
        { value: "completed", label: "Hoàn thành" },
        { value: "refunded", label: "Đã hoàn tiền" },
        { value: "on-hold", label: "Tạm giữ" },
        { value: "paid", label: "Đã thanh toán" },
    ];

    const handleEdit = (data) => {
        if (!data) {
            console.error("Dữ liệu chỉnh sửa không tồn tại:", data);
            return;
        }
        setOpen(true);
        setCurrentStatus(data.orderStatus || "");
        console.log("Chỉnh sửa:", data);
    };

    const handleDelete = (data) => {
        if (!data) {
            console.error("Dữ liệu xóa không tồn tại:", data);
            return;
        }
        console.log("Xóa:", data);
    };

    return (
        <>
            <ReusableTable
                columns={columns}
                data={initialData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                StatusOrder={statusOptions}
                navigate={"/dashboard/OrderByStaff/create"}
            />
        </>
    );
}
