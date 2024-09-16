/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = ({ columns }) => (
  <TableHead>
    <TableRow>
      {columns.map((column, index) => (
        <TableCell
          key={index}
          sx={column.label === "Trạng thái" ? { textAlign: "center" } : {}}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell>Hoạt Động</TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
