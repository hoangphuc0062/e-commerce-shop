import { styled } from "@mui/material";
import ReusableForm from "../../../components/form";
import "./index.css";

function AddStaff() {
    const fields = [
        {
            name: "name",
            label: "Họ và tên",
            required: true,
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "role",
            label: "Chức vụ",
            required: true,
            type: "select",
            options: ["Nhân viên", "Quản lý", "Giám đốc"],
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "address",
            label: "Địa chỉ",
            required: false,
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "email",
            label: "Email",
            required: true,
            type: "email",
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "SDT",
            label: "Số điện thoại",
            required: true,
            type: "tel",
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },


        {
            name: "department",
            label: "Phòng ban",
            required: false,
            type: "select",
            options: ["Phòng ban 1", "Phòng ban 2", "Phòng ban 3"],
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "base",
            label: "Cơ sở",
            required: false,
            type: "select",
            options: ["Cơ sở 1", "Cơ sở 2", "Cơ sở 3"],
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },

        {
            name: "startDate",
            label: "........................................Ngày bắt đầu",
            required: true,
            type: "date",
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "endDate",
            label: "........................................Ngày kết thúc",
            required: false,
            type: "date",
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
        {
            name: "salary",
            label: "Lương",
            required: true,
            type: "number",
            min: 0,
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 3,
        },
    ];
    const initialValues = {
        name: "",
        role: "",
        address: "",
        email: "",
        SDT: "",
        department: "",
        base: "",
        startDate: "",
        endDate: "",
        salary: "",
    };

    const handleSubmit = (formData) => {
        if (formData.salary < 0) {
            alert("Lương không thể là số âm!");
            return;
        }
        console.log("Form submitted with values:", formData);
    };

    const formStyles = {
        backgroundColor: "#f0f0f0",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "auto",
    };

    const fieldStyles = {
        backgroundColor: "#fff",
        borderRadius: 2,
        margin: "auto",
    };

    const buttonStyles = {
        backgroundColor: "#1976d2",
        "&:hover": {
            backgroundColor: "#115293",
        },
        padding: "10px 20px",
        fontSize: "16px",
    };
    return (
        <div>
            <ReusableForm
                fields={fields}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                title="Add Staff"
                formStyles={formStyles}
                fieldStyles={fieldStyles}
                buttonStyles={buttonStyles}
            />
        </div>
    );
}

export default AddStaff;
