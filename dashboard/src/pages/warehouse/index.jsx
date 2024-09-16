import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Grid, Paper } from '@mui/material';
import ReusableTable from '../../components/table';


// Dữ liệu ban đầu
const initialData = [
    {
        id: 10111,
        name: "Kho Tây Nguyên",
        address: "28 Ywang, TP BMT",
        describe: "Mô tả tất cả mọi thứ ở đây",
    },
    {
        id: 10112,
        name: "Kho Lak",
        address: "160 Y Moan, TP BMT",
        describe: "Mô tả tất cả mọi thứ ở đây",
    },
    {
        id: 10113,
        name: "Kho Ekao",
        address: "111 Phạm Ngũ Lão, TP BMT",
        describe: "Mô tả tất cả mọi thứ ở đây",
    }
];

// Các cột của bảng
const columns = [
    { label: "ID", field: "id" },
    { label: "Tên kho", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Mô tả", field: "describe" },
];

export default function WarehousePage() {
    const [open, setOpen] = useState(false); // Trạng thái của modal
    const [data, setData] = useState(initialData); // Dữ liệu của bảng
    const [newWarehouse, setNewWarehouse] = useState({
        id: '',
        name: '',
        address: '',
        describe: ''
    });

    const handleOpen = () => setOpen(true); // Mở modal
    const handleClose = () => setOpen(false); // Đóng modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewWarehouse({
            ...newWarehouse,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if (newWarehouse.name && newWarehouse.address) {
            setData([...data, { ...newWarehouse, id: Date.now() }]); // Tạo ID tự động
            handleClose();
        }
    };
    const handleEdit = (index) => {
        console.log("Edit", index);
    };

    const handleDelete = (index) => {
        console.log("Delete", index);
    };

    return (
        <>
            {/* Nút thêm kho hàng */}
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    mb: 2, // margin-bottom: 20px
                    bgcolor: 'rgb(85, 164, 255)', // màu nền
                    color: 'white', // màu chữ
                    '&:hover': {
                        bgcolor: 'rgb(255, 255, 255)', // màu nền khi hover
                        color: 'rgb(0, 0, 0)', // màu chữ khi hover
                        boxShadow: '0px 4px 10px rgba(0, 123, 255, 0.5)',// màu đổ bóng khi hover
                    }
                }}
            >
                Thêm kho hàng
            </Button>

            {/* Modal hiển thị form thêm kho hàng */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "60%",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '4px',
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <h2>Thêm kho mới</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Tên kho"
                                    name="name"
                                    value={newWarehouse.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    name="address"
                                    value={newWarehouse.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <TextField
                                    fullWidth
                                    label="Mô tả"
                                    name="describe"
                                    value={newWarehouse.describe}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} textAlign="right">
                            <Button variant="contained" color="success" onClick={handleSubmit}>
                                Thêm
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleClose}
                                style={{ marginLeft: '10px' }}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Modal>

            {/* Bảng dữ liệu */}
            <ReusableTable
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                data={data}
                columns={columns}
            />
        </>
    );
}
