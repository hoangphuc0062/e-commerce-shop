import ReusableTable from "../../components/Table";
import EyeStaff from "./details";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffPage() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const initialData = [
    {
      id: 111,
      name: "Nguyễn Văn A",
      role: "Manager",
      phone: "0912345678",
      email: "nguyenvana@example.com",
      startDate: "2022-01-15",
      endDate: "2024-01-15",
      commission: "10%",
      department: "Sales",
      base: "Hà Nội",
      fixedSalary: "20,000,000 VND",
      totalSalary: "25,000,000 VND",
      status: "pending",
    },
    {
      id: 222,
      name: "Trần Thị B",
      role: "Developer",
      phone: "0987654321",
      email: "tranthib@example.com",
      startDate: "2021-03-10",
      endDate: "2023-03-10",
      commission: "5%",
      department: "IT",
      base: "Hồ Chí Minh",
      fixedSalary: "15,000,000 VND",
      totalSalary: "17,500,000 VND",
      status: "processing",
    },
    {
      id: 333,
      name: "Lê Văn C",
      role: "Designer",
      phone: "0932123456",
      email: "levanc@example.com",
      startDate: "2020-06-20",
      endDate: "2022-06-20",
      commission: "8%",
      department: "Marketing",
      base: "Đà Nẵng",
      fixedSalary: "12,000,000 VND",
      totalSalary: "14,500,000 VND",
      status: "active",
    },
    {
      id: 444,
      name: "Phạm Thị D",
      role: "Tester",
      phone: "0912345678",
      email: "",
      startDate: "2022-01-15",
      endDate: "2024-01-15",
      commission: "10%",
      department: "Sales",
      base: "Hà Nội",
      fixedSalary: "20,000,000 VND",
      totalSalary: "25,000,000 VND",
      status: "shipped",
    },
  ];

  const columns = [
    { label: "Họ tên", field: "name" },
    { label: "Chức Vụ", field: "role" },
    { label: "SDT", field: "phone" },
    { label: "Email", field: "email" },
    { label: "Tỉ lệ hoa hồng", field: "commission" },
    { label: "Cơ sở", field: "base" },
    { label: "Lương cố định", field: "fixedSalary" },
    { label: "Trạng thái", field: "status" },
  ];

  const handleEdit = (index) => {
    console.log("Edit", index);
    navigate(`/dashboard/staff/edit/${index.id}`);
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

  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
        handleEye={handleEye}
        navigate={"/dashboard/staff/create"}
      />
      {/* Dialog chi tiec */}
      <EyeStaff
        open={open}
        handleClose={handleClose}
        selectedData={selectedData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}
