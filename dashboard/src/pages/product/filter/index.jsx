import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

export default function Filter() {
  const action = ({ row, handleEdit, handleDelete }) => {
    return (
      <>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            onClick={() => handleEdit(row)}
            sx={{ padding: "4px" }} // Reduced padding for action buttons
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{ color: "red", padding: "4px" }} // Reduced padding for action buttons
            onClick={() => handleDelete(row)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    console.log("Delete", row);
  };

  const columns = [
    { field: "key", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "price", headerName: "Giá", width: 200 },
    { field: "quantity", headerName: "Số lượng", width: 200 },
    { field: "category", headerName: "Danh mục", width: 200 },
    { field: "brand", headerName: "Thương hiệu", width: 200 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) =>
        action({ row: params.row, handleEdit, handleDelete }),
    },
  ];

  const data = [
    {
      key: 1,
      name: "Áo thun",
      price: 100000,
      quantity: 10,
      category: "Áo",
      brand: "Nike",
    },
    {
      key: 2,
      name: "Quần jean",
      price: 200000,
      quantity: 20,
      category: "Quần",
      brand: "Adidas",
    },
  ];

  const loading = false;

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          background: "#fff",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "linear-progress",
            },
          }}
          getRowId={(row) => row.key}
          localeText={{
            noRowsLabel: "Không có dữ liệu",
            MuiTablePagination: {
              labelRowsPerPage: "Số dòng mỗi trang",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
