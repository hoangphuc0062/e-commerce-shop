import { useState } from "react";
import { Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import ReusableTable from "../../components/table";
import { Card } from "react-bootstrap";

const columns = [
    { label: "Phương thức giao hàng", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Ghi chú", field: "note" },
];

const initialData = [
    {
        id: 19189091231,
        name: "Giao hàng tiết kiệm",
        address: "28 ywang thành phố BMT",
        note: "Hàng dễ vỡ"
    },
    {
        id: 19189091232,
        name: "Giao hàng nhanh",
        address: "120/2 ymoan thành phố BMT",
        note: "Thiết bị điện tử"
    },
    {
        id: 19189091233,
        name: "Giao hàng hỏa tốc",
        address: "120/2 ymoan thành phố BMT",
        note: "Thiết bị điện tử"
    }
];

const shippingMethods = [
    "Giao hàng tiết kiệm",
    "Giao hàng nhanh",
    "Giao hàng hỏa tốc",
    "Viettel Post",
    "Bưu điện"
];

export default function ShippingPage() {
    const [data, setData] = useState(initialData);
    const [newShipping, setNewShipping] = useState({ name: "", address: "", note: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddNewShipping = () => {
        if (isEditing && editingIndex !== null) {
            // Cập nhật phương thức giao hàng đã chỉnh sửa
            const updatedData = [...data];
            updatedData[editingIndex] = { ...newShipping, id: updatedData[editingIndex].id }; // Giữ nguyên ID
            setData(updatedData);
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            // Thêm phương thức giao hàng mới
            setData([...data, { id: Date.now(), ...newShipping }]);
        }
        setNewShipping({ name: "", address: "", note: "" });
    };

    const handleEdit = (rowData, index) => {
        setNewShipping(rowData);
        setIsEditing(true);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
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
                <Card style={{ padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <h4 style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                        {isEditing ? "Chỉnh sửa phương thức giao hàng" : "Thêm phương thức giao hàng mới"}
                    </h4>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Phương thức giao hàng</InputLabel>
                                    <Select
                                        value={newShipping.name}
                                        onChange={(e) => setNewShipping({ ...newShipping, name: e.target.value })}
                                    >
                                        {shippingMethods.map((method, index) => (
                                            <MenuItem key={index} value={method}>
                                                {method}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ"
                                    fullWidth
                                    variant="outlined"
                                    value={newShipping.address}
                                    onChange={(e) => setNewShipping({ ...newShipping, address: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    variant="outlined"
                                    value={newShipping.note}
                                    onChange={(e) => setNewShipping({ ...newShipping, note: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddNewShipping}
                            style={{ marginTop: '20px', width: '100%', padding: '10px 0', fontWeight: 'bold' }}
                        >
                            {isEditing ? "Cập nhật" : "Thêm"}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
