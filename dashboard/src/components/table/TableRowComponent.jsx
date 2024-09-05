/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TableRowComponent = ({ row, handleDelete, columns, handleEdit }) => (
  <TableRow>
    {columns.map((column) => (
      <TableCell key={column.field}>{row[column.field]}</TableCell>
    ))}
    <TableCell>
      <Tooltip title="Chỉnh Sửa">
        <IconButton color="primary" onClick={() => handleEdit(row.id)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton sx={{ color: "red" }} onClick={() => handleDelete(row.id)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

export default TableRowComponent;
