import ReusableTable from "../../components/table";
const handleEdit = (index) => {
  console.log("Edit", index);
};
const handleDelete = (index) => {
  console.log("Delete", index);
};
const initialData = [
  {
    id: 111,
    name: "Nguyễn Văn A",
    role: "Manager",
    sdt: "0912345678",
    email: "nguyenvana@example.com",
    startDate: "2022-01-15",
    endDate: "2024-01-15",
    commission: "10%",
    department: "Sales",
    base: "Hà Nội",
    fixedSalary: "20,000,000 VND",
    totalSalary: "25,000,000 VND",
  },
  {
    id: 222,
    name: "Trần Thị B",
    role: "Developer",
    sdt: "0987654321",
    email: "tranthib@example.com",
    startDate: "2021-03-10",
    endDate: "2023-03-10",
    commission: "5%",
    department: "IT",
    base: "Hồ Chí Minh",
    fixedSalary: "15,000,000 VND",
    totalSalary: "17,500,000 VND",
  },
  {
    id: 333,
    name: "Lê Văn C",
    role: "Designer",
    sdt: "0932123456",
    email: "levanc@example.com",
    startDate: "2020-06-20",
    endDate: "2022-06-20",
    commission: "8%",
    department: "Marketing",
    base: "Đà Nẵng",
    fixedSalary: "12,000,000 VND",
    totalSalary: "14,500,000 VND",
  },
];

const columns = [
  { label: "Họ tên", field: "name" },
  { label: "Chức Vụ", field: "role" },
  { label: "SDT", field: "sdt" },
  { label: "Email", field: "email" },
  { label: "Ngày bắt đầu", field: "startDate" },
  { label: "Ngày kết thúc", field: "endDate" },
  { label: "Tỉ lệ hoa hồng", field: "commission" },
  { label: "Phòng ban", field: "department" },
  { label: "Cơ sở", field: "base" },
  { label: "Lương cố định", field: "fixedSalary" },
  { label: "Tổng lương", field: "totalSalary" },
];
export default function StaffPage() {
  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
      />
    </>
  );
}
