import { useEffect, useState } from "react";
import ReusableTable from "../../components/Table";
import CartDialog from "./details";
import EditStatusDialog from "./edit";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomer,
  resetState,
  updateCustomer,
} from "../../redux/slices/customer";
import { handleToast } from "../../utils/toast";
import LoadingWrapper from "../../components/loading/LoadingWrapper";
export default function UserPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(null);
  const handleSubmit = (status, data) => {
    const updatedStatus = status === "blocked" ? true : false;
    dispatch(
      updateCustomer({
        customerId: data.id,
        data: { isBlocked: updatedStatus },
      })
    );
    setOpen(false);
  };

  const statusGetCustomer = useSelector((state) => state.customer.status);
  const dataCustomer = useSelector((state) => state.customer.data);
  const statusUpdateCustomer = useSelector(
    (state) => state.customer.statusUpdate
  );
  const getCustomers = () => dispatch(getCustomer());

  useEffect(() => {
    if (items.length === 0) {
      getCustomers();
    }
  }, [items, getCustomers, statusGetCustomer]);
  useEffect(() => {
    if (statusGetCustomer === "success") {
      dispatch(resetState({ key: "status", value: "idle" }));
    }
    if (statusGetCustomer === "failed") {
      handleToast("error", "Get customer failed", "top-right");
    }
  }, [statusGetCustomer, dispatch]);
  useEffect(() => {
    if (statusUpdateCustomer === "success") {
      getCustomers();
      // handleToast("success", "Update customer success", "top-right");
      dispatch(resetState({ key: "statusUpdate", value: "idle" }));
    }
  }, [statusUpdateCustomer, dispatch, getCustomers]);

  useEffect(() => {
    const initialData = Array.isArray(dataCustomer)
      ? dataCustomer.map((item) => ({
          id: item?._id,
          name: item?.name,
          address: item?.address,
          email: item?.email,
          sdt: item?.sdt,
          sex: item?.sex,
          membership: item?.membership,
          totalAmount: item?.totalAmount,
          status: item?.isBlocked === true ? "blocked" : "active",
          cart:
            item?.cart?.map((cartItem) => ({
              name: cartItem.name,
              price: cartItem.price,
              quantity: cartItem.quantity,
            })) || [],
        }))
      : [];

    if (initialData.length > 0) {
      setItems(initialData);
    }
  }, [dataCustomer]);

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
    setStatusOptions([
      { value: "active", label: "active" },
      { value: "blocked", label: "blocked" },
    ]);
    setIndex(index);
  };

  const handleEye = (index) => {
    setOpen(true);
    setData(index);
  };
  const optionStatus = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "blocked", label: "Bị chặn" },
  ];
  return (
    <>
      <LoadingWrapper>
        <ReusableTable
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={items}
          columns={columns}
          handleEye={handleEye}
          optionStatus={optionStatus}
        />
      </LoadingWrapper>
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
        data={index}
      />
    </>
  );
}
