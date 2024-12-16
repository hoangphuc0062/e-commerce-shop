import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAll,
  resetState,
  update,
} from "../../redux/slices/orders";
import { fDateVN, formatCurrency } from "../../utils/format-time";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { statusOrder } from "../../utils/statusConfig";
import { StatusOrderChip } from "../../components/StatusColor";
import { handleToast } from "./../../../../client/src/ultils/toast";
import { Link } from "react-router-dom";
import { DeleteConfirmationModal } from "../../utils/toast";

export default function OrderPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const initialData = useSelector((state) => state.orders.data);
  const status = useSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(initialData)) {
      setData(
        initialData.map((item) => ({
          sku: item.SKU,
          _id: item._id,
          staffName: item?.staff?.name || "online",
          name: item?.orderBy?.name || "Khách vãng lai",
          date: fDateVN(item.date),
          total: formatCurrency(item.total),
          paymentMethod: item.paymentMethod,
          status: item.status,
        }))
      );
      dispatch(resetState({ key: "getAllStatus", value: "idle" }));
    }
  }, [status, initialData, dispatch]);

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa thương hiệu",
        content: "Bạn có chắc chắn muốn xóa thương hiệu này không?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () =>
          dispatch(deleteOrder(index._id)).then((res) => {
            if (res.type === "orders/deleteOrder/fulfilled") {
              handleToast("success", "Xóa đơn hàng thành công");
              dispatch(getAll());
            } else {
              handleToast("error", "Xóa đơn hàng thất bại");
            }
          }),
      });
    },
    [dispatch]
  );
  const columns = [
    // { field: "_id", headerName: "Mã đơn hàng", width: 200, hide: true },
    { field: "sku", headerName: "Mã đơn hàng", width: 200 },
    { field: "staffName", headerName: "Nhân viên xử lý", width: 200 },
    { field: "name", headerName: "Tên khách hàng", width: 200 },
    { field: "date", headerName: "Ngày đặt hàng", width: 200 },
    { field: "total", headerName: "Tổng tiền", width: 200 },
    {
      field: "paymentMethod",
      headerName: "Phương thức",
      width: 200,
      renderCell: (params) => {
        return params.row.paymentMethod === "cash"
          ? "Thanh toán khi nhận hàng"
          : "Thanh toán online";
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        const statusKey = params?.row?.status?.toLowerCase();
        return <StatusOrderChip status={statusKey} />;
      },
      editable: true,
      type: "singleSelect",
      valueOptions: Object.keys(statusOrder).map((key) => ({
        value: key,
        label: statusOrder[key].label,
      })),
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Delete">
              <IconButton
                sx={{ color: "red", padding: "4px" }}
                onClick={() => handleDelete(params.row)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];
  const handleProcessRowUpdate = (newRow) => {
    const { _id, status } = newRow;
    dispatch(update({ orderId: _id, data: { status } })).then((res) => {
      console.log(res);
      if (res.type === "orders/updateStatus/fulfilled") {
        dispatch(getAll());
        handleToast("success", "Cập nhật trạng thái đơn hàng thành công");
      }
    });
    return newRow;
  };

  return (
    <>
      <Box
        sx={{
          height: 700,
          width: "100%",
          background: "#fff",
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Link to="/dashboard/orderByStaff/create">
            <Button variant="contained">Thêm đơn hàng</Button>
          </Link>
        </Box>
        <DataGrid
          rows={data}
          columns={columns}
          loading={status === "loading"}
          getRowId={(row) => row._id}
          localeText={{
            noRowsLabel: "Không có dữ liệu",
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng mỗi trang",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
