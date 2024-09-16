import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  TablePagination,
  TextField,
  Box,
} from "@mui/material";

import propTypes from "prop-types";
import { Delete, Edit } from "@mui/icons-material";

import EditCategoryDialog from "./edit";
import DeleteCategoryDialog from "./delete";
const CategoryList = ({ categories, onEdit, onDelete }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");

  // Open edit dialog
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    console.log(category);
    setEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setDeleteDialogOpen(true);
  };

  // Handle editing
  const handleEditSubmit = (updatedCategory) => {
    onEdit(currentCategory.id, updatedCategory);
    setEditDialogOpen(false); // Close dialog
  };

  // Handle deletion
  const handleDeleteSubmit = () => {
    onDelete(currentCategory.id);
    setDeleteDialogOpen(false); // Close dialog
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Search filter
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated categories
  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderCategoriesInTable = (parentId = null, level = 0) => {
    return paginatedCategories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => (
        <React.Fragment key={cat.id}>
          <TableRow>
            <TableCell sx={{ pl: level * 3 }}>{cat.name}</TableCell>
            <TableCell>
              <img
                src={`${cat.image}`}
                alt={cat.name}
                style={{ width: 50, height: 50 }}
              />
            </TableCell>
            <TableCell>{cat.description}</TableCell>
            <TableCell>
              <Tooltip title="Chỉnh Sửa">
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(cat)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa">
                <IconButton
                  sx={{ color: "red" }}
                  onClick={() => handleDeleteClick(cat)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
          {renderCategoriesInTable(cat.id, level + 1)}
        </React.Fragment>
      ));
  };

  return (
    <>
      <Box mb={2}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Danh mục</TableCell>
              <TableCell>Hình</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderCategoriesInTable()}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredCategories.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        labelRowsPerPage="Số dòng mỗi trang"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
        }
        sx={{
          "& .MuiTablePagination-selectLabel": {
            marginBottom: "4px", // Tùy chỉnh khoảng cách cho "Số dòng mỗi trang"
          },
          "& .MuiTablePagination-displayedRows": {
            marginTop: "16px", // Tăng khoảng cách để đẩy "1–5 trong 11" xuống
          },
        }}
      />

      {/* Edit Category Dialog */}
      <EditCategoryDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        initialValues={currentCategory || {}}
        onSave={handleEditSubmit}
      />

      {/* Delete Category Dialog */}
      <DeleteCategoryDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        Name={currentCategory?.name}
        onDelete={handleDeleteSubmit}
      />
    </>
  );
};

CategoryList.propTypes = {
  categories: propTypes.array.isRequired,
  onEdit: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};

export default CategoryList;
