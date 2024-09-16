// src/components/table/ReusableTableUser.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableContainer, TableBody, Paper, Button } from '@mui/material';
import TableHeader from './TableHeader';
import TableRowComponent from './TableRowComponent';
import SearchInput from './SearchInput';
import TablePaginationComponent from './TablePaginationComponent';
import { Link } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Delete, Edit } from "@mui/icons-material";


const ReusableTableUser = ({
    handleEdit,
    handleDelete,
    data,
    columns,
    handleAction,
    navigate
}) => {
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
    );

    // Đảm bảo chỉ số `page` không vượt quá số trang tối đa có sẵn
    useEffect(() => {
        if (page > Math.ceil(filteredData.length / rowsPerPage) - 1) {
            setPage(0); // Đặt lại trang nếu không hợp lệ
        }
    }, [filteredData, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper>
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Left side: Search Input */}
                <SearchInput search={search} setSearch={setSearch} />

                {/* Right side: Button */}
                <Link to={navigate}>
                    <Button
                        variant="contained"
                        sx={{
                            margin: 2,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#3498db',
                            color: 'white',
                            width: 'fit-content',
                            '&:hover': {
                                backgroundColor: 'rgb(65, 117, 178)',
                            },
                        }}
                    >
                        <ControlPointIcon sx={{ marginRight: 1 }} />
                        Thêm mới
                    </Button>
                </Link>
            </div>

            <TableContainer>
                <Table>
                    <TableHeader columns={columns} />
                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <tr key={rowIndex} className="align-middle">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.render ? col.render(row) : row[col.field]}
                                        </td>
                                    ))}
                                    {columns.some(col => col.field === 'actions') && (
                                        <td className="text-center">
                                            <button
                                                className="btn btn-link p-0 text-primary me-2"
                                                onClick={() => handleEdit(row.id)}
                                                aria-label="Edit"
                                            >
                                                <Edit />
                                            </button>
                                            <button
                                                className="btn btn-link p-0 text-danger me-2"
                                                onClick={() => handleDelete(row.id)}
                                                aria-label="Delete"
                                            >
                                                <Delete />
                                            </button>
                                            {handleAction && col.field === 'actions' && col.render && col.render(row)}
                                        </td>
                                    )}
                                </tr>
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

ReusableTableUser.propTypes = {
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    handleAction: PropTypes.func,
    navigate: PropTypes.string,
};

export default ReusableTableUser;
