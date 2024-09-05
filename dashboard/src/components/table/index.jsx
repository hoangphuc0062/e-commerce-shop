/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, TableContainer, TableBody, Paper } from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRowComponent";
import SearchInput from "./SearchInput";
import TablePaginationComponent from "./TablePaginationComponent";

// eslint-disable-next-line react/prop-types
const ReusableTable = ({ handleDelete, handleEdit, data, columns }) => {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Lọc dữ liệu theo từ khóa tìm kiếm
  // eslint-disable-next-line react/prop-types
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  // Đảm bảo chỉ số `page` không vượt quá số trang tối đa có sẵn
  useEffect(() => {
    if (page > Math.ceil(filteredData.length / rowsPerPage) - 1) {
      setPage(0); // Đặt lại trang nếu không hợp lệ
    }
  }, [filteredData, page, rowsPerPage]);

  return (
    <Paper>
      <SearchInput search={search} setSearch={setSearch} />
      <TableContainer>
        <Table>
          <TableHeader columns={columns} />
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRowComponent
                  key={row.id}
                  row={row}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  columns={columns}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationComponent
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReusableTable;
