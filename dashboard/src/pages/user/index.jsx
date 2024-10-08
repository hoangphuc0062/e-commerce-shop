import { useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import CartDialog from "./details";
import EditStatusDialog from "./edit";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../redux/slices/customer";
import { handleToast } from "../../utils/toast";
export default function UserPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const handleSubmit = (status) => {
    console.log("Submit", status);
    setOpen(false);
  };
  const statusGetCustomer = useSelector((state) => state.customer.status);
  const dataCustomer = useSelector((state) => state.customer.data);
  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  useEffect(() => {
    if (statusGetCustomer === "success") {
      handleToast("success", "Get customer successful", "top-right");
    }
  }, [statusGetCustomer]);
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
