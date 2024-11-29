import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete, Edit, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  deleteAllSettingFilter,
  deleteOneSettingFilter,
  getAllSettingFilter,
  getSlugByCategory,
} from "../../../redux/slices/settingFilter";
import { Link } from "react-router-dom";
import { DeleteConfirmationModal } from "../../../utils/toast";

export default function Filter() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [Data, setData] = useState([]);

  const status = useSelector((state) => state.settingFilter.status);
  const settingFilters = useSelector(
    (state) => state.settingFilter.data.settingFilters
  );
  const categories = useSelector(
    (state) => state.settingFilter.dataByCategory.rs
  );
  const statusDeleteAll = useSelector(
    (state) => state.settingFilter.statusDeleteAll
  );
  const statusDeleteOne = useSelector(
    (state) => state.settingFilter.statusDeleteOne
  );

  useEffect(() => {
    if (statusDeleteOne === "success") {
      dispatch(getAllSettingFilter());
    }
  }, [dispatch, statusDeleteOne]);

  useEffect(() => {
    if (statusDeleteAll === "success") {
      dispatch(getAllSettingFilter());
    }
  }, [statusDeleteAll, dispatch]);

  useEffect(() => {
    dispatch(getAllSettingFilter());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && settingFilters?.length) {
      const formattedData = {
        category: settingFilters.map((filter) => filter.category),
      };
      setData(formattedData);
    }
  }, [status, settingFilters]);

  const formattedData = useMemo(() => {
    if (status === "success" && settingFilters?.length) {
      return settingFilters.reduce((acc, filter) => {
        acc.push({
          id: filter._id,
          category:
            categories?.find((cat) => cat.slug === filter.category)?.name ||
            filter.category,
          categoryId: filter.category,
          isParent: true,
        });

        filter.filterButton.forEach((item) => {
          acc.push({
            id: item._id,
            idFilter: filter._id,
            parentCategoryId: filter.category,
            label: item.label,
            key: item.key,
            values: item.values,
            isParent: false,
          });
        });

        return acc;
      }, []);
    }
    return [];
  }, [status, settingFilters, categories]);

  useEffect(() => {
    if (Data) {
      dispatch(getSlugByCategory(Data));
    }
  }, [dispatch, Data]);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  }, []);

  const visibleRows = useMemo(
    () =>
      formattedData.filter(
        (row) => row.isParent || expandedCategories.has(row.parentCategoryId)
      ),
    [formattedData, expandedCategories]
  );

  const handleDeleteAll = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa bộ lọc",
        content: "Bạn có chắc chắn muốn xóa tất cả bộ lọc này?",
        onConfirm: () => dispatch(deleteAllSettingFilter(index.id)),
      });
    },
    [dispatch]
  );

  const handleDeleteOne = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa bộ lọc",
        content: "Bạn có chắc chắn muốn xóa bộ lọc này?",
        onConfirm: () =>
          dispatch(
            deleteOneSettingFilter({
              id: index.idFilter,
              idButton: index.id,
            })
          ),
      });
    },
    [dispatch]
  );

  const handleProcessRowUpdate = useCallback((newRow) => {
    // Extract only the fields we want to update
    const { key, values, label } = newRow;

    // Create the updated row with only these fields
    const updatedRow = {
      key,
      values,
      label,
      id: newRow.id,
      idFilter: newRow.idFilter,
    };

    console.log("Updated Row:", updatedRow);

    // Here you would update your backend or state as needed
    return { ...newRow, ...updatedRow }; // Return the updated row for DataGrid
  }, []);

  const columns = useMemo(
    () => [
      { field: "category", headerName: "Danh mục", width: 200 },
      { field: "label", headerName: "Tên bộ lọc", width: 200, editable: true },
      { field: "key", headerName: "Khóa", width: 200, editable: true },
      { field: "values", headerName: "Giá trị", width: 500, editable: true },
      {
        field: "action",
        headerName: "Hành động",
        width: 150,
        renderCell: (params) => {
          if (params.row.isParent) {
            const isExpanded = expandedCategories.has(params.row.categoryId);
            return (
              <>
                <Tooltip title={isExpanded ? "Ẩn" : "Hiển thị"}>
                  <IconButton
                    onClick={() => toggleCategory(params.row.categoryId)}
                  >
                    {isExpanded ? <VisibilityOff /> : <RemoveRedEye />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    sx={{ color: "red", padding: "4px" }}
                    onClick={() => handleDeleteAll(params.row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </>
            );
          }
          return renderActionButtons(params.row);
        },
      },
    ],
    [expandedCategories, handleDeleteAll, toggleCategory]
  );

  const renderActionButtons = (row) => (
    <>
      <Tooltip title="Edit">
        <IconButton
          color="primary"
          onClick={() => console.log("Edit", row)}
          sx={{ padding: "4px" }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          sx={{ color: "red", padding: "4px" }}
          onClick={() => handleDeleteOne(row)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(status === "loading");
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
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
        <Link to="/dashboard/filter/create">
          <Button variant="contained">Thêm bộ lọc</Button>
        </Link>
      </Box>

      <DataGrid
        rows={visibleRows}
        columns={columns}
        loading={loading}
        processRowUpdate={handleProcessRowUpdate}
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
        components={{
          Toolbar: GridToolbar,
        }}
        experimentalFeatures={{ newEditingApi: true }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
