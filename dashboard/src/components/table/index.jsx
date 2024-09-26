/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, TableContainer, TableBody, Paper, Button } from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRowComponent";
import SearchInput from "./SearchInput";
import TablePaginationComponent from "./TablePaginationComponent";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import SelectStatus from "./Select";

const ReusableTable = ({
  handleDelete,
  handleEdit,
  data,
  columns,
  handleEye,
  navigate,
  buttonAdd,
  optionStatus,
  StatusOrder,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // State for filtering by `status`
  const [orderStatusFilter, setOrderStatusFilter] = useState(""); // State for filtering by `orderStatus`
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Separate handler for status filter
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Separate handler for order status filter
  const handleOrderStatusChange = (event) => {
    setOrderStatusFilter(event.target.value);
  };

  // Lọc dữ liệu theo từ khóa tìm kiếm, status, và order status
  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" ||
        row.status?.toLowerCase() === statusFilter.toLowerCase()) &&
      (orderStatusFilter === "" ||
        row.orderStatus?.toLowerCase() === orderStatusFilter.toLowerCase())
  );

  // Đảm bảo chỉ số `page` không vượt quá số trang tối đa có sẵn
  useEffect(() => {
    if (page > Math.ceil(filteredData.length / rowsPerPage) - 1) {
      setPage(0); // Đặt lại trang nếu không hợp lệ
    }
  }, [filteredData, page, rowsPerPage]);

  return (
    <Paper>
      <div className="d-flex justify-content-between align-items-center">
        {/* Left side: Search Input and Filters */}
        <div className="d-flex">
          <SearchInput search={search} setSearch={setSearch} />

          {/* Conditionally render status filter */}
          {optionStatus && optionStatus.length > 0 && (
            <SelectStatus
              valua={statusFilter}
              onChange={handleStatusChange}
              options={optionStatus}
            />
          )}

          {/* Order Status Filter (this can be customized as needed) */}
          {StatusOrder && StatusOrder.length > 0 && (
            <SelectStatus
              valua={orderStatusFilter}
              onChange={handleOrderStatusChange}
              options={StatusOrder}
            />
          )}
        </div>

        {/* Right side: Button */}
        {navigate && (
          <Link to={navigate}>
            <Button
              variant="contained"
              sx={{
                margin: 2,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#3498db",
                color: "white",
                width: "fit-content",

                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              <ControlPointIcon sx={{ marginRight: 1 }} />
              Thêm mới
            </Button>
          </Link>
        )}
        {buttonAdd && (
          <Button
            variant="contained"
            sx={{
              margin: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#3498db",
              color: "white",
              width: "fit-content",

              "&:hover": {
                backgroundColor: "#2980b9",
              },
            }}
            onClick={buttonAdd}
          >
            <ControlPointIcon sx={{ marginRight: 1 }} />
            Thêm mới
          </Button>
        )}
      </div>

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
                  handleEye={handleEye}
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

ReusableTable.propTypes = {
  handleDelete: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  handleEye: propTypes.func,
  navigate: propTypes.string,
  buttonAdd: propTypes.func,
  optionStatus: propTypes.array,
  StatusOrder: propTypes.array,
};

export default ReusableTable;
