import { useState } from "react";
import {
    Button,
    Grid,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import ReusableTable from "../../components/table";
import CustomInputField from "../../components/InputField";

const columns = [
    { label: "Tên tag", field: "name" },
    { label: "Ngày tạo", field: "creationDate" }
];

const initialData = [
    {
        id: 12562267,
        name: "broduct",
        creationDate: "14/10/2024"
    }
];

export default function TagPage() {
    const [name, setName] = useState("");
    const [data, setData] = useState(initialData);
    const [editTag, setEditTag] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);
    const [error, setError] = useState("");

    const handleEdit = (tag) => {
        setEditTag(tag);
        setName(tag.name);
        setError("");
    };

    const handleSaveEdit = () => {
        if (validateInput()) {
            const updatedData = data.map(item =>
                item.id === editTag.id ? { ...item, name: name } : item
            );
            setData(updatedData);
            resetForm();
        }
    };

    const validateInput = () => {
        if (!name.trim()) {
            setError("Tên tag không được để trống");
            return false;
        }
        if (name.length < 3) {
            setError("Tên tag phải có ít nhất 3 ký tự");
            return false;
        }
        if (name.length > 100) {
            setError("Tên tag không được vượt quá 100 ký tự");
            return false;
        }
        setError("");
        return true;
    };

    const resetForm = () => {
        setEditTag(null);
        setName("");
    };

    const handleDelete = (tag) => {
        setTagToDelete(tag);
        setConfirmDelete(true);
    };

    const confirmDeleteTag = () => {
        const newData = data.filter(item => item.id !== tagToDelete.id);
        setData(newData);
        setConfirmDelete(false);
        setTagToDelete(null);
    };

    const handleCloseConfirmDelete = () => {
        setConfirmDelete(false);
        setTagToDelete(null);
    };

    const handleAddNew = () => {
        if (validateInput()) {
            const newTag = {
                id: Date.now(),
                name: name,
                creationDate: new Date().toLocaleDateString('vi-VN')
            };
            setData([...data, newTag]);
            setName("");
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '20px' }}>
            <div>
                <ReusableTable
                    data={data}
                    columns={columns}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
            <div>
                <Paper style={{ padding: '20px' }}>
                    <h3>{editTag ? "Chỉnh sửa Tag" : "Thêm mới Tag"}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CustomInputField
                                label="Tên Tag"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError(""); // Reset lỗi khi thay đổi giá trị
                                }}
                                error={!!error} // Truyền trạng thái lỗi
                                helperText={error} // Truyền thông báo lỗi
                                inputProps={{ maxLength: 100 }} // Giới hạn ký tự
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {editTag ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveEdit}
                                    disabled={!name}
                                >
                                    Lưu
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddNew}
                                    disabled={!name}
                                >
                                    Thêm mới
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </div>

            {/* Dialog xác nhận xóa */}
            <Dialog open={confirmDelete} onClose={handleCloseConfirmDelete}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <p>Bạn có chắc chắn muốn xóa tag "{tagToDelete ? tagToDelete.name : ''}" không?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDelete} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={confirmDeleteTag} color="primary">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
