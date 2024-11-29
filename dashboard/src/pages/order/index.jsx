import { useEffect, useState } from "react";
import ReusableTable from "../../components/table";
import EditStatusOrder from "./edit";
import { useDispatch, useSelector } from "react-redux";
import { getAll, resetState } from "../../redux/slices/orders";
import { fDateVN, formatCurrency, formatDay } from "../../utils/format-time";

export default function OrderPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const initialData = useSelector((state) => state.orders.data);
  const status = useSelector((state) => state.orders.status);

  const [open, setOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const columns = [
    { label: "Mã đơn hàng", field: "_id" },
    { label: "Nhân viên xử lý", field: "staffName" },
    { label: "Tên khách hàng", field: "name" },
    { label: "Ngày đặt hàng", field: "date" },
    { label: "Tổng tiền", field: "total" },
    { label: "phương thức", field: "paymentMethod" },
    { label: "Trạng thái", field: "status" },
  ];
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  //   cập nhập trạng thái đơn hàng
  // useEffect(() => {
  //   if (statusUpdateCustomer === "success") {
  //     handleToast("success", "Cập nhật người dùng thành công", "top-right");
  //     dispatch(resetState({ key: "statusUpdate", value: "idle" }));
  //     dispatch(getCustomer()); 
  //   }
  // }, [statusUpdateCustomer, dispatch]);
  useEffect(() => {
    if (status === "success" && initialData) {
      setData(
        initialData.map((item) => ({
          _id: item._id,
          staffName: item.staffName || "Online",
          name: item?.orderBy?.name || 'lỗi',
          date: fDateVN(item.date),
          total: formatCurrency(item.total),
          paymentMethod: item.paymentMethod,
          status: item.status,
        }))
      );

      dispatch(resetState({ key: "getAllStatus", value: "idle" }));
    }
  }, [dispatch, status, initialData]);

  const statusOptions = [
    { value: "delivered", label: "Đã giao hàng" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "cancelled", label: "Đã hủy" },
    { value: "returned", label: "Đã trả hàng" },
    { value: "completed", label: "Hoàn thành" },
    { value: "failed", label: "Thất bại" },
    { value: "refunded", label: "Đã hoàn tiền" },
    { value: "processing", label: "Đang xử lý" },
    { value: "on-hold", label: "Tạm giữ" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "unpaid", label: "Chưa thanh toán" },
    { value: "waiting", label: "Chờ đợi" },
  ];

  const handleEdit = (data) => {
    setOpen(true);
    setCurrentStatus(data.orderStatus);
    console.log(data);
  };
  const handleDelete = (data) => {
    console.log(data);
  };

  const handleSubmit = (status) => {
    console.log(status);
  };

  return (
    <>
      <ReusableTable
        columns={columns}
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        StatusOrder={statusOptions}
        navigate={"/dashboard/OrderByStaff/create"}
      />
      <EditStatusOrder
        open={open}
        handleClose={() => setOpen(false)}
        currentStatus={currentStatus}
        onSubmit={handleSubmit}
        statusOptions={statusOptions}
      />
    </>
  );
}
