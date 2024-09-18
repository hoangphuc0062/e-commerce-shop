import { useState } from "react";
import ReusableTable from "../../components/Table";
import CartDialog from "./details";
import EditStatusDialog from "./edit";
export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const handleSubmit = (status) => {
    console.log("Submit", status);
    setOpen(false);
  };

  const initialData = [
    {
      id: 1011,
      name: "John Doe",
      address: "28 ywang",
      email: "thainn@gamil.com",
      sdt: "0987654321",
      sex: "Nam",
      membership: "Student - Member",
      totalAmount: 2000000,
      status: "Active",
      cart: [
        {
          productName: "Watch XYZ",
          quantity: 2,
          price: 1000000,
          image: "https://via.placeholder.com/100",
          color: "Black",
          size: "M",
        },
        {
          productName: "Bracelet ABC",
          quantity: 1,
          price: 500000,
          image: "https://via.placeholder.com/100",
          color: "Silver",
          size: "S",
        },
      ],
    },
    {
      id: 1012,
      name: "Jane Smith",
      address: "12 Ngo Quyen",
      email: "jane.smith@example.com",
      sdt: "0912345678",
      sex: "Nữ",
      membership: "VIP - Member",
      totalAmount: 5500000,
      status: "Active",
      cart: [
        {
          productName: "Necklace DEF",
          quantity: 1,
          price: 3000000,
          image: "https://via.placeholder.com/100",
          color: "Gold",
          size: "L",
        },
        {
          productName: "Earrings GHI",
          quantity: 1,
          price: 2500000,
          image: "https://via.placeholder.com/100",
          color: "Rose Gold",
          size: "S",
        },
      ],
    },
    {
      id: 1013,
      name: "Michael Brown",
      address: "45 Tran Phu",
      email: "michael.brown@example.com",
      sdt: "0923456789",
      sex: "Nam",
      membership: "Regular - Member",
      totalAmount: 1500000,
      status: "Inactive",
      cart: [
        {
          productName: "Sunglasses JKL",
          quantity: 1,
          price: 1500000,
          image: "https://via.placeholder.com/100",
          color: "Brown",
          size: "M",
        },
      ],
    },
    {
      id: 1014,
      name: "Emily Davis",
      address: "23 Le Loi",
      email: "emily.davis@example.com",
      sdt: "0934567890",
      sex: "Nữ",
      membership: "Premium - Member",
      totalAmount: 4000000,
      status: "Active",
      cart: [
        {
          productName: "Handbag MNO",
          quantity: 1,
          price: "2.000.000",
          image: "https://via.placeholder.com/100",
          color: "Red",
          size: "S",
        },
        {
          productName: "Watch PQR",
          quantity: 1,
          price: 2000000,
          image: "https://via.placeholder.com/100",
          color: "Blue",
          size: "M",
        },
      ],
    },
    {
      id: 1015,
      name: "Chris Johnson",
      address: "67 Nguyen Trai",
      email: "chris.johnson@example.com",
      sdt: "0945678901",
      sex: "Nam",
      membership: "Student - Member",
      totalAmount: 1000000,
      status: "Inactive",
      cart: [
        {
          productName: "Belt STU",
          quantity: 2,
          price: 500000,
          image: "https://via.placeholder.com/100",
          color: "Black",
          size: "L",
        },
      ],
    },
  ];

  const columns = [
    { label: "Họ và tên", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Email", field: "email" },
    { label: "Số điện thoại", field: "sdt" },
    { label: "Giới tính", field: "sex" },
    { label: "Loại thành viên", field: "membership" },
    { label: "Tổng tiền", field: "totalAmount" },
    { label: "Trạng thái", field: "status" },
  ];

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  const handleEdit = (index) => {
    setDialogOpen(true);
    setStatus(index.status);
    console.log("Edit", index);
    console.log("Status", index.status);
    setStatusOptions([
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ]);
  };

  const handleEye = (index) => {
    setOpen(true);
    setData(index);
  };
  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
        handleEye={handleEye}
      />

      <CartDialog
        open={open}
        handleClose={() => setOpen(false)}
        items={data}
        onRemove={() => {}}
      />

      <EditStatusDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        currentStatus={status}
        onSubmit={handleSubmit}
        statusOptions={statusOptions}
      />
    </>
  );
}
