
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  RemoveRedEye,

  VisibilityOff,

} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSettingFilter } from "../../../redux/slices/settingFilter";

export default function Filter() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set()); // Track expanded categories

  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    console.log("Delete", row);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const status = useSelector((state) => state.settingFilter.status);
  const settingFilters = useSelector(
    (state) => state.settingFilter.data.settingFilters
  );

  useEffect(() => {
    dispatch(getAllSettingFilter());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && settingFilters?.length) {
      const groupedData = [];

      settingFilters.forEach((filter) => {
        // Add parent row for category
        groupedData.push({
          id: filter._id, // Unique ID for category row
          category: filter.category,
          isParent: true, // Mark as parent row
        });

        // Add child rows for filter buttons
        filter.filterButton.forEach((item) => {
          groupedData.push({
            id: `${filter._id}-${item._id}`, // Unique ID for child rows
            parentCategory: filter.category, // Link to parent
            label: item.label,
            key: item.key,
            values: item.values,
            isParent: false, // Mark as child row
          });
        });
      });

      setData(groupedData);
    }
  }, [status, settingFilters]);

  // Filter rows dynamically based on expanded categories
  const visibleRows = data.filter(
    (row) => row.isParent || expandedCategories.has(row.parentCategory)
  );

  const columns = [
    {
      field: "category",
      headerName: "Danh mục",
      width: 200,
      //   renderCell: (params) => {
      //     if (params.row.isParent) {
      //       const isExpanded = expandedCategories.has(params.row.category);
      //       return (
      //         <Box sx={{ display: "flex", alignItems: "center" }}>
      //           <IconButton onClick={() => toggleCategory(params.row.category)}>
      //             {isExpanded ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
      //           </IconButton>
      //           <span>{params.row.category}</span>
      //         </Box>
      //       );
      //     }
      //     return params.row.category;
      //   },
    },
    { field: "label", headerName: "Tên bộ lọc", width: 200 },
    { field: "key", headerName: "Khóa", width: 200 },
    { field: "values", headerName: "Giá trị", width: 500 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        if (params.row.isParent) {
          const isExpanded = expandedCategories.has(params.row.category);
          return (
            <Tooltip title={isExpanded ? "Ẩn" : "Hiển thị"}>
              <IconButton onClick={() => toggleCategory(params.row.category)}>
                {isExpanded ? < VisibilityOff/> : <RemoveRedEye />}
              </IconButton>
            </Tooltip>
          );
        }
        return action({ row: params.row, handleEdit, handleDelete });
      },
    },
  ];

  const action = ({ row, handleEdit, handleDelete }) => (
    <>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          onClick={() => handleEdit(row)}
          sx={{ padding: "4px" }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          sx={{ color: "red", padding: "4px" }}
          onClick={() => handleDelete(row)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );

  const loading = status === "loading";

  return (
    <Box
      sx={{
        height: 700,
        width: "100%",
        background: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <DataGrid
        rows={visibleRows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
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
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
