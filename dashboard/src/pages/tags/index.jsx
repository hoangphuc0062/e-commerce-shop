import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import ReusableTable from "../../components/table";
import CustomInputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { createTag, deleteTag, getAllTags, updateTag } from "../../redux/slices/tags"; // Added updateTag action
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { useFormik } from "formik";
import { Card } from "react-bootstrap";

const columns = [
    { label: "Tên tag", field: "name" },
];

export default function TagPage() {
    const dispatch = useDispatch();
    const [editTag, setEditTag] = useState(null);  // To track if we are in edit mode
    const [error, setError] = useState("");
    const [data, setData] = useState([]);

    const status = useSelector((state) => state.tag.status);  // Adjust state path to 'tags'
    const dataTags = useSelector((state) => state.tag.data?.tags);

    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch]);

    useEffect(() => {
        if (status === "succeeded") {
            setData(dataTags);
        }
    }, [status, dataTags]);

    const handleEdit = (tag) => {
        setEditTag(tag);  // Set the tag to edit mode
        formik.setFieldValue("name", tag.name); // Populate the form with selected tag data
    };

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values, { resetForm }) => {
            if (editTag) {
                // If edit mode, dispatch update action
                dispatch(updateTag({ tagId: editTag._id, data: { ...values } })).then((res) => {
                    if (res.type === "tags/updateTag/fulfilled") {
                        handleToast("success", "Tag cập nhật thành công");
                        resetForm();
                        setEditTag(null);  // Exit edit mode after successful update
                        dispatch(getAllTags());
                    } else {
                        handleToast("error", "Cập nhật tag thất bại");
                    }
                });
            } else {
                // If not in edit mode, create new tag
                dispatch(createTag(values)).then((res) => {
                    if (res.type === "tags/createTag/fulfilled") {
                        handleToast("success", "Tag thêm thành công");
                        resetForm();
                        dispatch(getAllTags());
                    } else {
                        handleToast("error", "Thêm tag thất bại");
                    }
                });
            }
        },
    });

    const handleDelete = useCallback(
        (index) => {
            DeleteConfirmationModal({
                title: "Xác nhận xóa tag",
                content: "Bạn có chắc chắn muốn xóa tag này không?",
                okText: "Xóa",
                cancelText: "Hủy",
                icon: "warning",
                confirmButtonText: "Xóa",
                onConfirm: () =>
                    dispatch(deleteTag(index._id)).then((res) => {
                        if (res.type === "tags/deleteTag/fulfilled") {
                            handleToast("success", "Xóa tag thành công");
                            dispatch(getAllTags());
                        } else {
                            handleToast("error", "Xóa tag thất bại");
                        }
                    }),
            });
        },
        [dispatch]
    );
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '20px' }}>
            <div>
                {data && (
                    <ReusableTable
                        data={data}
                        columns={columns}
                        handleEdit={handleEdit} // Pass the handleEdit function to the table
                        handleDelete={handleDelete}
                    />
                )}
            </div>
            <div>
                <Card
                    style={{ padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}

                >
                    <h4 style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                        {editTag ? "Chỉnh sửa Tags" : "Thêm Tags"}
                    </h4>
                    {/* <Typography
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: '#333'
                        }}
                        variant="h6"
                    >
                        {editTag ? "Cập nhật tag" : "Thêm tag"}
                    </Typography> */}
                    <form onSubmit={formik.handleSubmit}>
                        <CustomInputField
                            label="Tên Tag"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!error} // Trạng thái lỗi
                            helperText={error} // Thông báo lỗi
                        />
                        <Box mt={3} textAlign="right">
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                aria-label={editTag ? "Update Tag" : "Add Tag"}
                                disabled={!formik.values.name}
                                sx={{
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                }}
                            >
                                {editTag ? "Cập nhật" : "Thêm tag"}
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ marginLeft: 10 }}
                                aria-label="Cancel"
                                onClick={() => {
                                    formik.resetForm();
                                    setEditTag(null);
                                }}
                                sx={{
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                }}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </form>
                </Card>

            </div>
        </div>

    );
}
