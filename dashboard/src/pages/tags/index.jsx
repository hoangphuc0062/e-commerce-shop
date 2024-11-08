import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Grid,
    Box,
    Card,
    Typography,
} from "@mui/material";
import ReusableTable from "../../components/table";
import { useDispatch, useSelector } from "react-redux";
import { createTag, deleteTag, getAllTags, updateTag } from "../../redux/slices/tags"; // Added updateTag action
import { DeleteConfirmationModal, handleToast } from "../../utils/toast";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import ImageUploader from "../../components/upload";
import CustomInputField from "../../components/InputField";

const columns = [
    { label: "Tên tag", field: "name" },
    { label: "Hình ảnh", field: "image" },
];

export default function TagPage() {
    const dispatch = useDispatch();
    const [editTag, setEditTag] = useState(null);  // To track if we are in edit mode
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
        setEditTag(tag);
        formik.setValues({ name: tag.name, image: tag.image || "" });
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Tên tag không được để trống")
            .max(250, "Tên tag không được vượt quá 250 ký tự")
            .min(2, "Tên tag phải có tối thiểu 2 ký tự")
            .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Tên tag không được chứa khoảng trống hoặc dấu"),
        image: Yup.string().url("Đường dẫn hình ảnh không hợp lệ"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (editTag) {
                dispatch(updateTag({ tagId: editTag._id, data: { ...values } })).then((res) => {
                    if (res.type === "tags/updateTag/fulfilled") {
                        handleToast("success", "Tag cập nhật thành công");
                        resetForm();
                        setEditTag(null);
                        dispatch(getAllTags());
                    } else {
                        handleToast("error", "Cập nhật tag thất bại");
                    }
                });
            } else {
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

    const handleImageUpload = (url) => {
        formik.setFieldValue("image", url);
    };

    const handleImageDelete = () => {
        formik.setFieldValue("image", "");
    };

    const handleDelete = useCallback(
        (tag) => {
            DeleteConfirmationModal({
                title: "Xác nhận xóa tag",
                content: "Bạn có chắc chắn muốn xóa tag này không?",
                okText: "Xóa",
                cancelText: "Hủy",
                icon: "warning",
                confirmButtonText: "Xóa",
                onConfirm: () =>
                    dispatch(deleteTag(tag._id)).then((res) => {
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
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
            <div>
                <Card sx={{ p: 3 }}>
                    <Typography sx={{ mb: 2 }} variant="h6">
                        {editTag ? "Cập nhật tag" : "Thêm tag"}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ImageUploader
                                    label="Hình ảnh"
                                    name="image"
                                    onUploadComplete={handleImageUpload}
                                    onDelete={handleImageDelete}
                                    error={formik.touched.image && Boolean(formik.errors.image)}
                                    helperText={formik.touched.image ? formik.errors.image : ""}
                                    folder="brand"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomInputField
                                    label="Tên Tag"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name ? formik.errors.name : ""}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} textAlign="right">
                            <Button
                                variant="contained"
                                type="submit"
                                color="success"
                                aria-label={editTag ? "Update Tag" : "Add Tag"}
                                disabled={!formik.values.name}
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
