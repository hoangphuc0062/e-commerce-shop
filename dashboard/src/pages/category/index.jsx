import ReusableTable from "../../components/Table";
import { Box, Paper, styled, Grid } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategory,
  updatePosition,
} from "../../redux/slices/category";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { resetState } from "../../redux/slices/icon";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function CategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [draggedItem, setDraggedItem] = useState(null);
  const [items, setItems] = useState([]);

  const columns = [
    { label: "Tên danh mục", field: "name" },
    { label: "Slug", field: "slug" },
    { label: "Icon", field: "icon" },
    { label: "Loại", field: "type" },
  ];

  const status = useSelector((state) => state.category.status);
  const data = useSelector((state) => state.category.data);
  const deleteStatus = useSelector(
    (state) => state.category.deleteCategoryStatus
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && data) {
      setItems(
        data
          ?.filter((item) => item.position !== undefined)
          .sort((a, b) => a.position - b.position)
          .map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
            icon: <Icon icon={`eva:${item.icon?.className}`} />,
            type: item.type,
            position: item.position,
          }))
      );
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [status, data, dispatch]);

  useEffect(() => {
    if (deleteStatus === "success") {
      dispatch(getCategory());
      handleToast("success", "Xóa danh mục thành công", "top-right");
      dispatch(resetState({ key: "deleteCategoryStatus", value: "idle" }));
    }
  }, [deleteStatus, dispatch]);

  const onDragStart = useCallback((e, index) => {
    setDraggedItem(index);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e, index) => {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, removed);
      setItems(newItems);

      const categories = newItems.map((item, i) => ({
        _id: item.id,
        position: i,
      }));

      saveCategoryOrder(categories);
    },
    [draggedItem, items] // Dependency array includes draggedItem and items
  );

  const saveCategoryOrder = useCallback(
    (categories) => {
      dispatch(updatePosition({ data: categories })).then((res) => {
        if (res.type === "category/updatePosition/fulfilled") {
          handleToast("success", "Danh mục đã được cập nhật", "top-right");
          dispatch(getCategory());
        } else {
          handleToast("error", "Có lỗi xảy ra", "top-right");
        }
      });
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (index) => {
      navigate(`/dashboard/category/update/${index.id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (index) => {
      DeleteConfirmationModal({
        title: "Xác nhận xóa danh mục",
        content: "Bạn có chắc chắn muốn xóa danh mục này?",
        okText: "Xóa",
        cancelText: "Hủy",
        icon: "warning",
        confirmButtonText: "Xóa",
        onConfirm: () => dispatch(deleteCategory(index.id)),
      });
    },
    [dispatch]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                style={{
                  padding: "8px",
                  margin: "4px",
                  backgroundColor: "#f0f0f0",
                  cursor: "move",
                }}
              >
                {item.icon} - {item.name}
              </div>
            ))}
          </Item>
        </Grid>
        <Grid item xs={9}>
          <ReusableTable
            columns={columns}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={items}
            navigate={"/dashboard/category/create"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryPage;
